const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
require('dotenv').config();

class PatientValidation {

  validateCreatePatient = (data) => {
    const schema = Joi.object({
      name: Joi.string().regex(new RegExp(process.env.REGEX_NAME)).required(),
      date_of_birth: Joi.string().regex(new RegExp(process.env.REGEX_BIRTHDAY)),
      gender: Joi.string(),
      phoneNumber: Joi.string().regex(new RegExp(process.env.REGEX_PHONE_NUMBER)),
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
      medicalHistory: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          process: Joi.string().required(),
        })
      ),
      address: Joi.string(),
      email: Joi.string().regex(new RegExp(process.env.REGEX_EMAIL)),
      record: Joi.string(),
    }).strict();
    return schema.validate(data);
  };

  validateUpdatePatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)), //required()
      name: Joi.string().regex(new RegExp(process.env.REGEX_NAME)),
      phoneNumber: Joi.string().regex(new RegExp(process.env.REGEX_PHONE_NUMBER)),
      address: Joi.string(),
      email: Joi.string().regex(new RegExp(process.env.REGEX_EMAIL)),
      medicalHistory: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          process: Joi.string().required(),
        })
      ),
    }).strict();

    return schema.validate(data);
  };

  validateRemovePatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindPatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD))
    }).strict();

    return schema.validate(data);
  };

  validateCreateRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string().regex(new RegExp(process.env.REGEX_BIRTHDAY)),
      description: Joi.string(),
      diagnosis: Joi.string().required(),
      prescription: Joi.array().items(
        Joi.object({
          evening: Joi.number().required(),
          morning: Joi.number().required(),
          noon: Joi.number().required(),
          medicine: Joi.string().required(),
          medicineID: Joi.string().regex(/^\d{10}$/).required(),
          quantity: Joi.number().required(),
        }).strict()
      ),
      testResult: Joi.array().items(
        Joi.object({
          result: Joi.string().required(),
          testName: Joi.string().required(),
        }).required()
      ),
    }).strict();

    return schema.validate(data);
  }

  validateRemoveRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string()
        .regex(new RegExp(process.env.REGEX_BIRTHDAY))
        .required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string().regex(new RegExp(process.env.REGEX_BIRTHDAY)).required()
    }).strict();

    return schema.validate(data);
  };

  validateTreatmentProcessByID = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
    }).strict();

    return schema.validate(data);
    // return true;
  };

  validateRegisterPatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
      faculty: Joi.string().valid("CAR", "DERMA", "GEN", "OPH", "OTO", "PED").required(),
    }).strict();

    return schema.validate(data);
  };

  validateQueryPatientInQueue = (data) => {
    const schema = Joi.object({
      DBIdBytime: Joi.string().regex(/^\d{6}$/),
      faculty: Joi.string().valid("CAR", "DERMA", "GEN", "OPH", "OTO", "PED").required(),
    }).strict();

    return schema.validate(data);
  }
}

class DoctorValidation {
  validateCreateDoctor = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
      name: Joi.string().required(),
      role: Joi.string().valid("ADMIN", "DOCTOR").required(),
      faculty: Joi.string().valid("CAR", "DERMA", "GEN", "OPH", "OTO", "PED").required(),
      email: Joi.string().email().required(),
      gender: Joi.string().required(), // Giới tính female hoặc male
      birthday: Joi.string().regex(new RegExp(process.env.REGEX_BIRTHDAY)).required(), // Kiểm tra ngày sinh theo định dạng yyyy-mm-dd và bắt buộc
      address: Joi.string().required(),
      degree: Joi.string().required(),
      clinic: Joi.string().required(),
      position: Joi.string().required(),
      specialized: Joi.string().required(),
      working_hours: Joi.array().items(
        Joi.object({
          day: Joi.string().required(),
          start_time: Joi.string().required(),
          end_time: Joi.string().required(),
        }))
    }).strict();

    return schema.validate(data);
  };

  validateQueryDoctor = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().required()
    }).strict();

    return schema.validate(data);
  };

  validationUpdateStaff = (data) => {
    const schema = Joi.object({
      address: Joi.string(),
      degree: Joi.string(),
      specialized: Joi.string(),
      clinic: Joi.string(),
      position: Joi.string(),
      faculty: Joi.string().valid("CAR", "DERMA", "GEN", "OPH", "OTO", "PED"),
      working_hours: Joi.array().items(
        Joi.object({
          day: Joi.string().required(),
          start_time: Joi.string().required(),
          end_time: Joi.string().required(),
        }))
    }).strict();
    return schema.validate(data);
  }


}

class AuthenticateValidation {
  login = (data) => {
    const schema = Joi.object({
      account: Joi.string().email().required(),
      password: joiPassword
        .string()
        .min(8)
        .noWhiteSpaces()
    }).strict()

    return schema.validate(data);
  };
}

class MedicineValidation {
  validateCreateMedicine = (data) => {
    const schema = Joi.object({
      brand: Joi.string().required(),
      disposal_price: Joi.number().required().greater(0),
      expiration_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required(),
      manufacture_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required(),
      origin: Joi.string().required(),
      purchase_price: Joi.number().min(0).required(),
      quantity: Joi.number().min(0).required(),
    }).strict();
    return schema.validate(data);
  };


  validateQueryMedicine = (data) => {
    const schema = Joi.object({
      id: Joi.string().pattern(new RegExp(process.env.REGEX_ID)).required()
    }).strict();

    return schema.validate(data);
  };

  validateFindMedicine = (data) => {
    const schema = Joi.object({
      id: Joi.string().regex(new RegExp(process.env.REGEX_ID))
    }).strict();

    return schema.validate(data);
  };

  validateQueryMedicineByBrand = (data) => {
    const schema = Joi.object({
      brand: Joi.string()
    }).strict();

    return schema.validate(data);
  };

  validateUpdateMedicine = (data) => {
    const schema = Joi.object({
      brand: Joi.string(),
      disposal_price: Joi.number().greater(0),
      expiration_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)),
      manufacture_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)),
      origin: Joi.string(),
      purchase_price: Joi.number().min(0),
      quantity: Joi.number().min(0),
    }).strict();
    return schema.validate(data);
  };


}

class MedicalEquipmentValidation {
  validateCreateMedicalEquipment = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      warranty_expiration_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required(),
      status: Joi.string().required(),
      purchase_price: Joi.number().min(0).required(),
      warranty_history: Joi.array().items(
        Joi.object({
          date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required()
        }).strict()
      )
    }).strict();
    return schema.validate(data);
  };

  validateQueryMedicalEquipment = (data) => {
    const schema = Joi.object({
      id: Joi.string().pattern(new RegExp(process.env.REGEX_ID)).required(),
    }).strict();

    return schema.validate(data)
  };

  validateQueryMedicalEquipByName = (data) => {
    const schema = Joi.object({
      name: Joi.string()
    }).strict();

    return schema.validate(data);
  };

  validateFindMedicalEquip = (data) => {
    const schema = Joi.object({
      id: Joi.string().regex(new RegExp(process.env.REGEX_ID))
    }).strict();

    return schema.validate(data);
  };

  validateUpdateMedicalEquip = (data) => {
    const schema = Joi.object({
      name: Joi.string(),
      warranty_expiration_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)),
      status: Joi.string(),
      purchase_price: Joi.number().min(0),
      warranty_history: Joi.array().items(
        Joi.object({
          date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)),
          description: Joi.string()
        }).strict()
      )
    }).strict();
    return schema.validate(data);
  };
}

module.exports = {
  PatientValidation,
  DoctorValidation,
  AuthenticateValidation,
  MedicineValidation,
  MedicalEquipmentValidation
}