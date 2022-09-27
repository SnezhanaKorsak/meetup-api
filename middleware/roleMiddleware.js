import { responseStatus } from '../constants/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

export const roleMiddleware  =  (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next()
  }

  try {
    const { role } = req.user

    if (role !== 'admin') {
      return res.status(responseStatus.unauthorized).json({message: "You don't have access"})
    }

    next()
  } catch (error) {
    return res.status(responseStatus.unauthorized).json({message: "User is not authorized"})
  }
}