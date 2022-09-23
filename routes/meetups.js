import { Router } from 'express'
import { getMeetups, getMeetupById, createMeetup, updateMeetup, deleteMeetup } from "../controllers/meetups.js";

const router = Router()

// Get all meetups
router.get('/meetups', getMeetups)

// Get meetup by ID
router.get('/meetups/:id', getMeetupById)

// Add new meetup
router.post('/meetups', createMeetup)

// Update meetup by ID
router.put('/meetups/:id', updateMeetup)

// Delete meetup by ID
router.delete('/meetups/:id', deleteMeetup)


export default router