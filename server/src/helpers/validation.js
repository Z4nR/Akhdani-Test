const Joi = require("joi");
const JoiPassword = require("joi-password-complexity");

module.exports = {
  registValidate: (data) => {
    const schema = Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().required().label("Email"),
      username: Joi.string().required().label("Username"),
      password: JoiPassword().required().label("Password"),
      role: Joi.string().required().label("Role"),
    });

    return schema.validate(data);
  },

  loginValidate: (data) => {
    const schema = Joi.object({
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password"),
    });

    return schema.validate(data);
  },

  cityValidate: (data) => {
    const schema = Joi.object({
      name: Joi.string().required().label("City Name"),
      lat: Joi.number().required().label("City Latitude"),
      long: Joi.number().required().label("City Longitude"),
      province: Joi.string().required().label("City Province"),
      island: Joi.string().required().label("City Island"),
      aboard: Joi.boolean().required().label("City Country"),
    });

    return schema.validate(data);
  },

  perdinValidate: (data) => {
    const schema = Joi.object({
      name: Joi.string().required().label("Employee Name"),
      note: Joi.string().required().label("Perdin Note"),
      startDate: Joi.string().required().label("Perdin Start Date"),
      endDate: Joi.string().required().label("Perdin End Date"),
      fromCity: Joi.string().required().label("Perdin From City"),
      destinationCity: Joi.string().required().label("Perdin Destinaiton City"),
      durationDay: Joi.string().required().label("Perdin Duration"),
      status: Joi.string().required().label("Perdin Status"),
    });

    return schema.validate(data);
  },
};
