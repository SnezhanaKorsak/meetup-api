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