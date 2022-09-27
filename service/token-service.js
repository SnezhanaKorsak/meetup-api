import jwt from 'jsonwebtoken';
import { pool } from "../db.js";
import * as dotenv from 'dotenv'

dotenv.config()

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })

    return { accessToken, refreshToken }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {ignoreExpiration: true})

      return userData
    } catch (e) {
        return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData =  jwt.verify(token, process.env.JWT_REFRESH_SECRET, {ignoreExpiration: true})

      return userData
    } catch (e) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const sqlQuery = 'UPDATE users SET refresh_token = $1 WHERE id = $2'
    const valuesQuery = [refreshToken, userId]

    await pool.query(sqlQuery, valuesQuery)
  }

  async removeToken(refreshToken) {
    const sqlQuery = 'UPDATE users SET refresh_token = null WHERE refresh_token = $1'
    const valuesQuery = [refreshToken]

    await pool.query(sqlQuery, valuesQuery)
  }

  async findToken(refreshToken) {
    const sqlQuery = 'SELECT * FROM users WHERE refresh_token = $1'
    const valuesQuery = [refreshToken]

    return await pool.query(sqlQuery, valuesQuery)
  }
}

export const tokenService = new TokenService()