import { pool } from '../db.js'
import { v4 as uuid } from 'uuid'
import { responseStatus } from "../constants/index.js";

export const getMeetups = async (req, res) => {
  let sqlQuery = 'SELECT * FROM meetups'
  const {sortBy, search, order, offset, limit, ...filter} = req.query

  if (search) {
    sqlQuery += ` WHERE to_tsvector(title || ' ' || description || ' ' || place) @@ to_tsquery('${search}')`
  }

  if (sortBy) {
    sqlQuery += ` ORDER BY ${sortBy} ${order || 'ASC'}`
  }

  if (Object.keys(filter).length !== 0) {
    const filterValues = Object.keys(filter)
    const filterQuery = filterValues.map(item => `${item} ILIKE '%${filter[item]}%'`).join(' AND ')

    sqlQuery += ` WHERE ${filterQuery}`
  }

  if (limit && offset) {
    sqlQuery += ` OFFSET ${offset} LIMIT ${limit}`
  }

  try {
    const meetups = await pool.query(sqlQuery)
    res.status(responseStatus.success).json(meetups.rows)
  } catch (error) {
    res.status(responseStatus.serverError).json({message: error.message})
  }
}

export const getMeetupById = async (req, res) => {
  const id = req.params.id
  const sqlQuery = 'SELECT * FROM meetups where id = $1'
  const valuesQuery = [id]

  try {
    const meetup = await pool.query(sqlQuery, valuesQuery)
    res.status(responseStatus.success).json(meetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({message: error.message})
  }
}

export const createMeetup = async (req, res) => {
  const id = uuid();
  const {title, description, time, place} = req.body
  // const {id: person_id} = req.user
  const sqlQuery = 'INSERT INTO meetups (id, title, description, time, place) values($1, $2, $3, $4, $5) RETURNING *'
  const valuesQuery = [id, title, description, time, place]

  try {
    const newMeetup = await pool.query(sqlQuery, valuesQuery)
    res.status(responseStatus.created).json(newMeetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({message: 'Something wrong with request'})
  }

}

export const updateMeetup = async (req, res) => {
  const id = req.params.id
  const {title, description, time, place} = req.body
  const sqlQuery = 'UPDATE meetups set title = $1, description = $2, time = $3, place = $4 where id = $5 RETURNING *'
  const valuesQuery = [title, description, time, place, id]

  try {
    const updatedMeetup = await pool.query(sqlQuery, valuesQuery)
    res.status(responseStatus.created).json(updatedMeetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({message: error.message})
  }
}

export const deleteMeetup = async (req, res) => {
  const id = req.params.id
  const sqlQuery = 'DELETE FROM meetups where id = $1'
  const valuesQuery = [id]

  try {
    const meetup = await pool.query(sqlQuery, valuesQuery)
    res.status(responseStatus.success).json(meetup.rows[0])
  } catch (error) {
    res.status(responseStatus.serverError).json({message: error.message})
  }
}