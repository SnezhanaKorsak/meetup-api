import { Router } from 'express'
import { getMeetups, getMeetupById, createMeetup, updateMeetup, deleteMeetup } from "../controllers/meetups.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = Router()

// Get all meetups
router.get('/meetups', getMeetups)

// Get meetup by ID
router.get('/meetups/:id', getMeetupById)

// Add new meetup
router.post('/meetups', authMiddleware, roleMiddleware, createMeetup)

// Update meetup by ID
router.put('/meetups/:id',authMiddleware, roleMiddleware, updateMeetup)

// Delete meetup by ID
router.delete('/meetups/:id',authMiddleware, roleMiddleware, deleteMeetup)


export default router