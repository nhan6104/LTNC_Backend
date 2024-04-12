const Joi = require("joi");

class PatientValidation {

  validateCreatePatient = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      date_of_birth: Joi.string()
        .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
        .required(),
      gender: Joi.string().required(),
      phoneNumber: Joi.string().regex(new RegExp("^[0-9]{1,10}$")).required(),
      cccd: Joi.string().alphanum().required(),
      medicalHistory: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          process: Joi.string().required(),
        })
      ).required(),
      address: Joi.object({
        province: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
      }).required(),
    }).strict();
    return schema.validate(data);
  };

  validateUpdatePatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
      name: Joi.string(),
      phoneNumber: Joi.string().regex(new RegExp("^[0-9]{1,10}$")),
      address: Joi.object({
        province: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
      }),
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
      cccd: Joi.string().alphanum().required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindPatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
    }).strict();

    return schema.validate(data);
  };

  validateCreateRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string()
      .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
      .required(),
      cccd: Joi.string().alphanum().required(),
      description: Joi.string().required(),
      diagnosis: Joi.string(),
      prescription: Joi.array().items(
        Joi.object({
          dosage: Joi.object({
            evening: Joi.number().required(),
            morning: Joi.number().required(),
            noon: Joi.number().required(),
          }).strict(),
          medicine: Joi.string().required(),
          quantity: Joi.number().required(),
        }).strict()
      ),
      testResult: Joi.array().items(
        Joi.object({
          result: Joi.string().required(),
          testName: Joi.string().required(),
        })
      ),
    }).strict();

    return schema.validate(data);
  }

  validateRemoveRecords = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
      date: Joi.string()
      .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
      .required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindRecords = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
      date: Joi.string()
      .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
      .required(),
    }).strict();

    return schema.validate(data);
  };

  validateTreatmentProcessByID = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
    }).strict();

    return schema.validate(data);
  };
}

class DoctorValidation {
  validateCreateDoctor = (data) => {
    const schema = Joi.object({
        cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        gender: Joi.string().required(), // Giới tính female hoặc male
        birthday: Joi.string().regex(new RegExp(process.env.REGEX_BIRTHDAY)).required(), // Kiểm tra ngày sinh theo định dạng yyyy-mm-dd và bắt buộc
        address: Joi.string().required(),
        degree : Joi.string().required(),
        specialized : Joi.string().required(),
        clinic: Joi.string().required(),
        position: Joi.string().required(),
        degree: Joi.string().required(),
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
      degree : Joi.string(),
      specialized : Joi.string(),
      clinic: Joi.string(),
      position: Joi.string(),
      degree: Joi.string(),
      specialized: Joi.string(),
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


module.exports = {
  PatientValidation,
  DoctorValidation
}