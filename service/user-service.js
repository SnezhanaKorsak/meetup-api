import bcrypt from 'bcryptjs';
import { createUser, findUserByID, getUser } from '../helpers/index.js';
import { tokenService } from './token-service.js';
import { UserDto } from "../dtos/user-dto.js";

class UserService {
  async registration(email, password, role) {
    const candidate = await getUser(email)

    if (candidate) {
      throw new Error(`User with email ${email} already exists`)
    }

    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = role || 'user'

    const user =  await createUser(email, hashPassword, userRole)
    const userDto = new UserDto(user)  // id, email, role
    const tokens = tokenService.generateToken({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async login(email, password) {
    const user = await getUser(email)

    if (!user) {
      throw new Error(`User with ${email} was not found`)
    }

    const isPasswordEquals = await bcrypt.compareSync(password, user.password)

    if (!isPasswordEquals) {
      throw new Error('Invalid password. Please, try again')
    }

    const userDto = new UserDto(user)  // id, email, role

    const tokens = tokenService.generateToken({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken) {

    if (!refreshToken) {
      throw Error('User is not authorized!')
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)

    if(!userData || !tokenFromDB) {
      throw Error('User is not authorized!')
    }

    const user = await findUserByID(userData.id)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateToken({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }
}


export const userService = new UserService()