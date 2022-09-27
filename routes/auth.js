import { Router } from 'express'

import { getUsers, login, logout, registration, refreshToken } from '../controllers/auth.js';
import { userValidation } from '../middleware/validationMiddleware.js';
import {userSchema} from '../validation/shemas.js';
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router()

// Registration
router.post('/registration', userValidation(userSchema),  registration)

// Log in
router.post('/login', login)

// Log out
router.post('/logout', logout)

// Refresh token
router.get('/refresh', refreshToken)

// Getting a list of users for administrator and registered users only
router.get('/users', authMiddleware, getUsers)


export default router;