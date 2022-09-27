import { responseStatus } from '../constants/index.js';
import * as dotenv from 'dotenv';
import { tokenService } from "../service/token-service.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return res.status(responseStatus.unauthorized).json({ message: "User is not authorized" })
    }

    const accessToken = authorizationHeader.split(' ')[1]

    if(!accessToken) {
      return res.status(responseStatus.unauthorized).json({ message: "User is not authorized" })
    }

    const userData = tokenService.validateAccessToken(accessToken)

    if(!userData) {
      return res.status(responseStatus.unauthorized).json({ message: "User is not authorized" })
    }

    req.user = userData
    next()
  } catch (error) {
    return res.status(responseStatus.unauthorized).json({ message: "User is not authorized" })
  }
}
