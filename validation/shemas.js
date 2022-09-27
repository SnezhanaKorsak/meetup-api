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

export const meetupSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  time: Joi.date().required(),
  place: Joi.string().required()
})