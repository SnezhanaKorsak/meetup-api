import Joi from 'joi'

export const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(4)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
})