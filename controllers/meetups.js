import { responseStatus } from "../constants/index.js";
import { meetupService } from "../service/meetup-service.js";

export const getMeetups = async (req, res) => {
  try {
    const { sortBy, search, order, offset, limit, ...filter } = req.query
    const meetups = await meetupService.getAllMeetups(sortBy, search, order, offset, limit, filter)
    res.status(responseStatus.success).json(meetups.rows)
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const getMeetupById = async (req, res) => {
  try {
    const id = req.params.id
    const meetup = await meetupService.getMeetupById(id)
    res.status(responseStatus.success).json(meetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const createMeetup = async (req, res) => {
  try {
    const { title, description, time, place } = req.body
    const { id: userId } = req.user
    const newMeetup = await meetupService.createMeetup(title, description, time, place, userId)
    res.status(responseStatus.created).json(newMeetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: 'Something wrong with request' })
  }
}

export const updateMeetup = async (req, res) => {
  try {
    const id = req.params.id
    const { title, description, time, place } = req.body

    const updatedMeetup = await meetupService.updateMeetup(id, title, description, time, place, req.user.id)
    res.status(responseStatus.created).json(updatedMeetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}

export const deleteMeetup = async (req, res) => {
  try {
    const meetupId = req.params.id

    await meetupService.deleteMeetup(meetupId,req.user.id)
    res.status(responseStatus.success).json('Meetup was deleted')
  } catch (error) {
    res.status(responseStatus.serverError).json({ message: error.message })
  }
}