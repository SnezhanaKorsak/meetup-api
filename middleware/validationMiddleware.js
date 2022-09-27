import { responseStatus } from "../constants/index.js";

export const userValidation = (schema) => (req, res, next) => {
  const { email, password } = req.body
  const { error } = schema.validate({ email, password });

  if (error) {
    res.status(responseStatus.badRequest).json(error.details[0].message)
  } else {
    next()
  }
}

export const meetupValidation = (schema) => (req, res, next) => {
  const {title, description, time, place} = req.body
  const { error } = schema.validate({title, description, time, place});

  if (error) {
    res.status(responseStatus.badRequest).json(error.details[0].message)
  } else {
    next()
  }
}