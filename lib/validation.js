const Joi = require("joi");
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

module.exports = {
  PatientValidation,
  
}