import jwt from 'jsonwebtoken';
import { responseStatus } from '../constants/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const roleMiddleware  = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if(!token) {
      return res.status(responseStatus.unauthorized).json({message: "User is not authorized"})
    }

    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    const { userRole } = userData
    req.user = userData

    if (userRole !== 'admin') {
      return res.status(responseStatus.unauthorized).json({message: "You don't have access"})
    }

    next()
  } catch (error) {
    return res.status(responseStatus.unauthorized).json({message: "User is not authorized"})
  }
}