const Joi = require("joi");
const {
  joiPasswordExtendCore
} = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
require('dotenv').config();

const REGEX_USERNAME = new RegExp(process.env.REGEX_USERNAME);
const REGEX_NAME = new RegExp(process.env.REGEX_NAME);
const REGEX_EMAIL = new RegExp(process.env.REGEX_EMAIL);
const REGEX_PHONE_NUMBER = new RegExp(process.env.REGEX_PHONE_NUMBER);
const REGEX_BIRTHDAY = new RegExp(process.env.REGEX_BIRTHDAY);
const REGEX_CCCD = new RegExp(process.env.REGEX_CCCD);

class PatientValidation {

  validateCreatePatient = (data) => {
    const schema = Joi.object({
      name: Joi.string().pattern(REGEX_NAME).required(),
      date_of_birth: Joi.string()
        // .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
        .pattern(REGEX_BIRTHDAY),
      gender: Joi.string(),
      phoneNumber: Joi.string().pattern(REGEX_PHONE_NUMBER),
      cccd: Joi.string().pattern(REGEX_CCCD).required(),
      medicalHistory: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          process: Joi.string().required(),
        })
      ),
      address: Joi.string(),
    }).strict();
    return schema.validate(data);
  };

  validateUpdatePatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().pattern(REGEX_CCCD), //required()
      name: Joi.string().pattern(REGEX_NAME),
      phoneNumber: Joi.string().pattern(REGEX_PHONE_NUMBER),
      address: Joi.string(),
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
      cccd: Joi.string().pattern(REGEX_CCCD).required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindPatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().pattern(REGEX_CCCD).required()
    }).strict();

    return schema.validate(data);
  };

  validateCreateRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string().pattern(REGEX_BIRTHDAY).required(),
      description: Joi.string(),
      diagnosis: Joi.string().required(),
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
        }).required()
      ),
    }).strict();

    return schema.validate(data);
  }

  validateRemoveRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string()
        .regex(new RegExp("^(19|20)\\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$"))
        .required(),
    }).strict();

    return schema.validate(data);
  };

  validateFindRecords = (data) => {
    const schema = Joi.object({
      date: Joi.string().pattern(REGEX_BIRTHDAY).required()
    }).strict();

    return schema.validate(data);
  };

  validateTreatmentProcessByID = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
    }).strict();

    return schema.validate(data);
    // return true;
  };
}

class DoctorValidation {
  validateCreateDoctor = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().regex(new RegExp(process.env.REGEX_CCCD)).required(),
      name: Joi.string().required(),
      role: Joi.string().valid("ADMIN", "DOCTOR").required(),
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
      purchase_price: Joi.number().required().greater(0),
      quantity: Joi.number().required().greater(0)
    }).strict();
    return schema.validate(data);
  };

  // validateQueryDoctor = (data) => {
  //   const schema = Joi.object({
  //     cccd: Joi.string().required()
  //   }).strict();

  //   return schema.validate(data);
  // };
}

class MedicalEquipmentValidation {
  validateCreateMedicalEquipment = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      warranty_expiration_date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required(),
      status: Joi.string().required(),
      purchase_price: Joi.number().required().greater(0),
      warranty_history: Joi.array().items(
        Joi.object({
          date: Joi.string().regex(new RegExp(process.env.REGEX_DATE_MEDICINE)).required()
        }).unknown(true)
      )
    }).strict();
    return schema.validate(data);
  };

  // validateQueryDoctor = (data) => {
  //   const schema = Joi.object({
  //     cccd: Joi.string().required()
  //   }).strict();

  //   return schema.validate(data);
  // };
}

module.exports = {
  PatientValidation,
  DoctorValidation,
  AuthenticateValidation,
  MedicineValidation,
  MedicalEquipmentValidation
}