const patientService = require("../services/patientService");

const medicalService = require("../services/medicineService");

const validation = require("../lib/validation");

const patientValidation = new validation.PatientValidation();

const createPatient = async (req, res) => {
  try {
    const { error } = patientValidation.validateCreatePatient(req.body);
    console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const checkingPatient = await patientService.checkExistPatient(
      req.body.cccd
    );
    if (checkingPatient) {
      return res.status(400).json({
        error: true,
        message: "Người dùng đã tồn tại",
      });
    }

    const newPatient = [
      {
        cccd: req.body.cccd,
        reference: `patient/${req.body.cccd}`,
        name: req.body.name,
      },
    ];

    const patients = await patientService.findPatients();

    if (patients.patient) {
      // console.log(patients.patient[0]);
      for (const patient of patients.patient) {
        newPatient.push(patient);
      }
    }

    const resultCreatingNewPatientInTotal =
      await patientService.creatPatientInTotal({ patient: newPatient });

    const ref = `patient/${req.body.cccd}`;
    const resultCreatingNewPatient = await patientService.createPatient(
      req.body,
      ref
    );

    let textResultCreatingNewPatient;
    if (!resultCreatingNewPatient) {
      textResultCreatingNewPatient = `Tạo bệnh nhân thất bại.`;
    } else {
      textResultCreatingNewPatient = `Tạo bệnh nhân thành công.`;
    }

    let textResultCreatingNewPatientInTotal;
    if (!resultCreatingNewPatientInTotal) {
      textResultCreatingNewPatientInTotal = `Tạo bệnh nhân trong bảng tổng thất bại.`;
    } else {
      textResultCreatingNewPatientInTotal = `Tạo bệnh nhân trong bảng tổng thành công.`;
    }

    return res.status(200).json({
      error: false,
      message: `
                Kết quả:\n
                ${textResultCreatingNewPatient}\n
                ${textResultCreatingNewPatientInTotal}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const removePatient = async (req, res) => {
  try {
    const { error } = patientValidation.validateRemovePatient(req.query);
    // console.log(req.query.cccd);
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const patients = await patientService.findPatients();

    let textResultRemovePatient;
    for (let el of patients.patient) {
      if (el.cccd === req.query.cccd) {
        const ref = el.reference;
        const history = await patientService.findHistory(req.query.cccd);

        if (history) {
          for (hist of history.medicalHistory) {
            let dateID = hist.date.replace(/-/g, "");
            // console.log(dateID);
            await patientService.removeRecords(req.query.cccd, dateID);
          }
        }
        await patientService.removePatientByPath(ref);

        let newPatient = new Array();
        newPatient = patients.patient.filter(
          (item) => item.cccd !== req.query.cccd
        );

        await patientService.creatPatientInTotal({ patient: newPatient });

        textResultRemovePatient = `Xóa bệnh nhân thành công.`;
        return res.status(200).json({
          error: false,
          message: `
                    Kết quả:\n
                    ${textResultRemovePatient}\n`,
          data: el,
        });
      }
    }

    return res.status(400).json({
      error: true,
      message: "Người dùng không tồn tại",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const createRecords = async (req, res) => {
  try {
    const { error } =
      patientValidation.validateFindPatient(req.query) &&
      patientValidation.validateCreateRecords(req.body);
    // console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const formattedDate = req.body.date.replace(/-/g, "");
    const patients = await patientService.findPatients();

    const matchingPatient = patients.patient.filter(
      (el) => el.cccd === req.query.cccd
    );

    let ref;
    if (matchingPatient.length > 0) {
      ref = matchingPatient[0].reference;
    }

    if (!ref) {
      return res.status(400).json({
        error: true,
        message: "Người dùng không tồn tại",
      });
    }

    const history = await patientService.findHistory(req.query.cccd);

    const newRecords = [
      {
        name: req.body.diagnosis,
        date: req.body.date,
        reference: `patient/${req.query.cccd}/medicalRecords/${formattedDate}`,
      },
    ];

    if (!history.medicalHistory) {
      const medicine = await medicalService.findMedicines();
      let totalPrice = 0;

      for (let el of req.body.prescription) {
        let foundMedicine = medicine.find((item) => item.id === el.medicineID);
        foundMedicine.quantity -= el.quantity;
        if (foundMedicine.quantity < 0) {
          return res.status(400).json({
            error: true,
            message: `Không đủ số lượng thuốc.`,
          });
        }
        await medicalService.updateMedicine(foundMedicine, foundMedicine.id);
        totalPrice += el.quantity * foundMedicine.disposal_price;
      }

      const newData = req.body;
      newData["total_price"] = totalPrice;

      await patientService.createRecords(req.body, req.query.cccd);
      await patientService.createRecordsInHistory(
        { medicalHistory: newRecords },
        req.query.cccd
      );

      // console.log(medicine);

      return res.status(200).json({
        error: false,
        message: `Tạo bệnh án thành công.`,
      });
    }

    for (const el of history.medicalHistory) {
      if (el.date === req.body.date && el.name === req.body.diagnosis) {
        return res.status(400).json({
          error: true,
          message: "Bệnh án trùng.",
        });
      }
    }

    const resultCreatingNewRecords = await patientService.createRecords(
      req.body,
      req.query.cccd
    );

    if (history.medicalHistory) {
      // console.log(history.medicalHistory[0]);
      for (const el of history.medicalHistory) {
        newRecords.push(el);
      }
    }

    await patientService.createRecordsInHistory(
      { medicalHistory: newRecords },
      req.query.cccd
    );

    let textResultCreatingNewRecords;
    if (!resultCreatingNewRecords) {
      textResultCreatingNewRecords = `Tạo bệnh án thất bại.`;
    } else {
      textResultCreatingNewRecords = `Tạo bệnh án thành công.`;
    }

    return res.status(200).json({
      error: false,
      message: `
            Kết quả:\n
            ${textResultCreatingNewRecords}\n`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const removeRecords = async (req, res) => {
  try {
    const { error } =
      patientValidation.validateFindPatient(req.query) &&
      patientValidation.validateRemoveRecords(req.body);
    console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const patients = await patientService.findPatients();
    let ref;
    const matchingPatient = patients.patient.filter(
      (el) => el.cccd === req.query.cccd
    );

    if (matchingPatient.length > 0) {
      ref = matchingPatient[0].reference;
    }
    if (!ref) {
      return res.status(400).json({
        error: true,
        message: "Người dùng không tồn tại",
      });
    }

    const history = await patientService.findHistory(req.query.cccd);

    let textResultRemoveRecords;

    const matchingRecord = history.medicalHistory.find(
      (el) => el.date === req.body.date
    );

    if (matchingRecord) {
      textResultRemoveRecords = `Xóa bệnh án thành công.`;
      const ref = matchingRecord.reference;
      await patientService.removeRecordsByPath(ref);

      const newRecords = history.medicalHistory.filter(
        (item) => item.date !== req.body.date
      );

      await patientService.createRecordsInHistory(
        { medicalHistory: newRecords },
        req.query.cccd
      );

      return res.status(200).json({
        error: false,
        message: `
                Kết quả:\n
                ${textResultRemoveRecords}\n`,
        data: matchingRecord,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const treatmentProcessByID = async (req, res) => {
  try {
    const { error } = patientValidation.validateTreatmentProcessByID(req.query);
    console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const checkingPatient = await patientService.checkExistPatient(
      req.query.cccd
    );

    if (!checkingPatient) {
      return res.status(400).json({
        error: true,
        message: "Người dùng không tồn tại",
      });
    }

    const result = await patientService.treatmentProcessByID(req.query.cccd);

    let textResult;

    if (!result) {
      textResult = `Lấy quá trình chữa bệnh thất bại.`;
    } else {
      textResult = `Lấy quá trình chữa bệnh thành công.`;
    }

    return res.status(200).json({
      error: false,
      message: `Kết quả: ${textResult}\n`,
      medicalHistory: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const updatePatientData = async (req, res) => {
  try {
    const { error } =
      patientValidation.validateFindPatient(req.query) &&
      patientValidation.validateUpdatePatient(req.body);
    console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const checkingPatient = await patientService.checkExistPatient(
      req.query.cccd
    );

    if (!checkingPatient) {
      return res.status(400).json({
        error: true,
        message: "Người dùng không tồn tại",
      });
    }

    const result = await patientService.updatePatientData(
      req.body,
      req.query.cccd
    );

    let textResult;

    if (!result) {
      textResult = `Cập nhật thông tin bệnh nhân thất bại.`;
    } else {
      textResult = `Cập nhật thông tin bệnh nhân thành công.`;
    }

    return res.status(200).json({
      error: false,
      message: `
            Kết quả:\n
            ${textResult}\n`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const findPatient = async (req, res) => {
  try {
    const { error } = patientValidation.validateFindPatient(req.query);
    console.log(req.body);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const patients = await patientService.findPatients();

    let textResultFindPatient;

    const foundPatient = patients.patient.find(
      (el) => el.cccd === req.query.cccd
    );

    if (foundPatient) {
      textResultFindPatient = `Tìm kiếm bệnh nhân thành công.`;
      const dataPatient = await patientService.findPatientByPath(
        foundPatient.reference
      );
      return res.status(200).json({
        error: false,
        message: `
                Kết quả:\n
                ${textResultFindPatient}\n`,
        data: dataPatient,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: `Người dùng không tồn tại.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const findRecords = async (req, res) => {
  try {
    const { error } = patientValidation.validateFindRecords(req.query);
    console.log(req.query);
    if (error) {
      // console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const formattedDate = req.query.date.replace(/-/g, "");
    const checkingPatient = await patientService.checkExistRecords(
      req.query.cccd,
      formattedDate
    );
    if (!checkingPatient) {
      return res.status(400).json({
        error: true,
        message: "Bệnh án không tồn tại",
      });
    }

    const history = await patientService.findHistory(req.query.cccd);

    let resultFindRecords;
    const matchingRecords = history.medicalHistory.filter(
      (el) => el.date === req.query.date
    );

    if (matchingRecords.length > 0) {
      resultFindRecords = await patientService.findRecordsByDate(
        req.query.cccd,
        formattedDate
      );
    }

    let textResultFindRecords;

    if (!resultFindRecords) {
      textResultFindRecords = `Tìm kiếm bệnh án thất bại.`;
    } else {
      textResultFindRecords = `Tìm kiếm bệnh án thành công.`;
    }

    return res.status(200).json({
      error: false,
      message: `
            Kết quả:\n
            ${textResultFindRecords}\n`,
      data: resultFindRecords,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const findAllPatient = async (req, res) => {
  try {
    const patients = await patientService.findPatients();
    if (!patients.patient) {
      return res.status(400).json({
        error: true,
        message: `Không có bệnh nhân.`,
      });
    }
    return res.status(200).json({
      error: false,
      data: patients,
    });
  } catch (err) {
    console.log(err);
    // Ensure res is defined before using it
    if (res) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    } else {
      // Handle the case when res is undefined
      console.error("Response object (res) is undefined.");
    }
  }
};

// {
//     cccd: "",
//     faculty:""
// }

const registerPatient = async (req, res) => {
  try {
    const { error } = patientValidation.validateRegisterPatient(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const patients = await patientService.findPatients();

    if (!patients) {
      return res.status(400).json({
        error: true,
        message: "Không tồn tại bệnh nhân. Vui lòng đăng kí thông tin",
      });
    }

    const foundPatient = patients.patient.filter(
      (el) => el.cccd === req.body.cccd
    );

    if (!foundPatient) {
      return res.status(400).json({
        error: true,
        message: "Không tồn tại bệnh nhân. Vui lòng đăng kí thông tin",
      });
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${hours < 10 ? "0" + hours : hours}${
      minutes < 10 ? "0" + minutes : minutes
    }${seconds < 10 ? "0" + seconds : seconds}`;

    const tempPatient = {
      DBIdBytime: formattedTime,
      cccd: req.body.cccd,
      name: foundPatient[0].name,
      faculty: req.body.faculty,
      active: 0,
    };

    patientService.createPatientInRealtimeDb(tempPatient);

    return res.status(200).json({
      error: false,
      message: "Đăng kí khám thành công",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// {
//     falculty:
// }

const findPatientsInQueue = async (req, res) => {
  if (req.body.role === "ADMIN") {
    const patients = await patientService.getAllPatientInRealtimeDb();

    return res.status(200).json({
      error: false,
      message: "Lấy thành công",
      data: patients,
    });
  }

  const result = await patientService.getAllPatientInRealtimeDbInFalculty(
    req.body
  );
  console.log(result);

  if (!result) {
    return res.status(400).json({
      error: true,
      message: "Không có bệnh nhân cần khám",
    });
  }

  let patients = new Array();

  for (const patient in result) {
    patients.push(result[patient]);
  }

  return res.status(200).json({
    error: false,
    message: "Lấy thành công",
    data: patients,
  });
};

const updateActiveAfterRegister = async (req, res) => {
  try {
    const { error } = patientValidation.validateQueryPatientInQueue(req.query);

    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    const result = await patientService.getAllPatientInRealtimeDb(req.query);

    if (result) {
      let el;
      for (el in result[req.query.faculty]) {
        if (el === req.query.DBIdBytime) {
          result[req.query.faculty][el].active = 1;
          console.log(result[req.query.faculty][el]);
          await patientService.createPatientInRealtimeDb(
            result[req.query.faculty][el]
          );
          break;
        }
      }
      return res.status(200).json({
        error: false,
        message: "Cập nhật thành công.",
        data: result[req.query.faculty][el],
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Cập nhật thất bại.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const completeHealing = async (req, res) => {
  try {
    const { error } = patientValidation.validateQueryPatientInQueue(req.query);

    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    let result = await patientService.getAllPatientInRealtimeDb(req.query);

    if (!result) {
      return res.status(400).json({
        error: true,
        message: "Không có bệnh nhân chờ khám.",
      });
    }

    let el;
    if (result) {
      for (el in result[req.query.faculty]) {
        if (el === req.query.DBIdBytime) {
          break;
        }
      }
    }

    let foundPatient = result[req.query.faculty][el];

    if (foundPatient) {
      if (foundPatient.active == 1) {
        const tmpPatient = {
          faculty: req.query.faculty,
          DBIdBytime: foundPatient.DBIdBytime,
        };
        await patientService.removePatientInRealtimeDb(tmpPatient);

        return res.status(200).json({
          error: false,
          message: "Khám hoàn tất.",
          data: tmpPatient,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Người dùng chưa được đăng ký khám.",
        });
      }
    } else {
      return res.status(400).json({
        error: true,
        message: "Người dùng không có trong hàng chờ.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = {
  createPatient,
  removePatient,
  createRecords,
  removeRecords,
  treatmentProcessByID,
  updatePatientData,
  findPatient,
  findRecords,
  findAllPatient,
  registerPatient,
  findPatientsInQueue,
  completeHealing,
  updateActiveAfterRegister,
};
