import { Router } from 'express'
import { getMeetups, getMeetupById, createMeetup, updateMeetup, deleteMeetup } from "../controllers/meetups.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { meetupValidation } from '../middleware/validationMiddleware.js';
import {meetupSchema} from '../validation/shemas.js';

const router = Router()

// Get all meetups
router.get('/meetups', getMeetups)

// Get meetup by ID
router.get('/meetups/:id', getMeetupById)

// Add new meetup
router.post('/meetups', authMiddleware, roleMiddleware, meetupValidation(meetupSchema), createMeetup)

// Update meetup by ID
router.put('/meetups/:id',authMiddleware, roleMiddleware, meetupValidation(meetupSchema), updateMeetup)

// Delete meetup by ID
router.delete('/meetups/:id',authMiddleware, roleMiddleware, deleteMeetup)


export default router