const Joi = require("joi");

class PatientValidation {
  validateLoginStaff = (data) => {
    const schema = Joi.object({
      cccd: Joi.string()
        .regex(new RegExp(process.env.REGEX_CCCD))
        .min(10)
        .max(15)
        .required(),
      password: Joi.string().required(),
    }).strict();

    return schema.validate(data);
  };

  validateCreatePatient = (data) => {
    const schema = Joi.object({
      fullname: Joi.string().required(),
      date_of_birth: Joi.string()
        .regex(
          new RegExp("^(19|20)d{2}-(0[1-9]|1[1,2])-(0[1-9]|[12][0-9]|3[01])$")
        )
        .required(),
      gender: Joi.boolean().required(),
      phone_number: Joi.string().regex(new RegExp("^[0-9]{1,10}$")).required(),
      cccd: Joi.string().alphanum().required(),
    }).strict();
    return schema.validate(data);
  };

  validateUpdatePatient = (data) => {
    const schema = Joi.object({
      phone_number: Joi.string().regex(new RegExp("^[0-9]{1,10}$")).required(),
    }).strict();

    return schema.validate(data);
  };

  validateDeltedPatient = (data) => {
    const schema = Joi.object({
      cccd: Joi.string().alphanum().required(),
    }).strict();

    return schema.validate(data);
  };

  validateCreateMedical = (data) => {
    const schema = Joi.object({
      description: Joi.string().alphanum().required(),
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
}

module.exports = {
  PatientValidation,
  
}