import { v4 as uuid } from 'uuid';
import { pool } from '../db.js';
import * as dotenv from 'dotenv'
import { meetupService } from '../service/meetup-service.js';

dotenv.config()

export const getUser = async (email) => {
  const sqlQuery = 'SELECT * FROM users WHERE email = $1'
  const valuesQuery = [email]

  const user = await pool.query(sqlQuery, valuesQuery)
  return user.rows[0]
}

export const getAllUsers = async () => {
  const users = await pool.query("SELECT * FROM users")

  return users.rows
}

export const findUserByID = async (userId) => {
  const sqlQuery = 'SELECT * FROM users WHERE id=$1'
  const valuesQuery = [userId]

  const users = await pool.query(sqlQuery, valuesQuery)
  console.log(userId, users.rows)
  return users.rows[0]
}

export const createUser = async (email, password, role) => {
  const id = uuid();

  const sqlQuery = 'INSERT INTO users (id, email, password, role) values($1, $2, $3, $4) RETURNING *'
  const valuesQuery = [id, email, password, role]

  const user = await pool.query(sqlQuery, valuesQuery)

  return user.rows[0]
}

export const isOwner = async (meetupId, currentUserId) => {
  const meetup = await meetupService.getMeetupById(meetupId)

  if(!meetup) {
    throw new Error('An meetup with this id was not found.')
  }

  return meetup.rows[0].user_id === currentUserId;
}