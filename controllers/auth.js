import { responseStatus } from '../constants/index.js';
import { getAllUsers } from '../helpers/index.js';
import { userService } from '../service/user-service.js';

export const registration = async (req, res) => {
  try {
    const { email, password, role } = req.body
    const userData = await userService.registration(email, password, role)

    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)

  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userData = await userService.login(email, password)

    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)

  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    await userService.logout(refreshToken)

    res.clearCookie('refreshToken')
    res.status(responseStatus.success).json('You are logged out')

  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies

    const userData = await userService.refresh(refreshToken)

    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)

  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users)
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}