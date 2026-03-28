const Joi = require("joi");

const noteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

module.exports = { noteSchema };