const Joi = require("joi");

function validate(carBody) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
  });

  return schema.validate(carBody);
}

module.exports = {
  validate,
};
