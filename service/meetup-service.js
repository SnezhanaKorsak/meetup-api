import { v4 as uuid } from 'uuid'
import { pool } from '../db.js';
import { isOwner } from '../helpers/index.js';

class MeetupService {
  async getAllMeetups(sortBy, search, order, offset, limit, filters) {
    let sqlQuery = 'SELECT * FROM meetups'

    if (search) {
      sqlQuery += ` WHERE to_tsvector(title || ' ' || description || ' ' || place) @@ to_tsquery('${search}')`
    }

    if (sortBy) {
      sqlQuery += ` ORDER BY ${sortBy} ${order || 'ASC'}`
    }

    if (Object.keys(filters).length !== 0) {
      const filterValues = Object.keys(filters)
      const filterQuery = filterValues.map(item => `${item} ILIKE '%${filters[item]}%'`).join(' AND ')

      sqlQuery += ` WHERE ${filterQuery}`
      console.log(sqlQuery)
    }

    if (limit && offset) {
      sqlQuery += ` OFFSET ${offset} LIMIT ${limit}`
    }

    return await pool.query(sqlQuery)
  }

  async getMeetupById(id) {
    const sqlQuery = 'SELECT * FROM meetups where id = $1'
    const valuesQuery = [id]

    return await pool.query(sqlQuery, valuesQuery)
  }

  async createMeetup(title, description, time, place, userId) {
    const id = uuid();

    const sqlQuery = 'INSERT INTO meetups (id, title, description, time, place, user_id) values($1, $2, $3, $4, $5, $6) RETURNING *'
    const valuesQuery = [id, title, description, time, place, userId]

    return await pool.query(sqlQuery, valuesQuery)
  }

  async updateMeetup(meetupId, title, description, time, place, userId) {
    const sqlQuery = 'UPDATE meetups set title = $1, description = $2, time = $3, place = $4 where id = $5 RETURNING *'
    const valuesQuery = [title, description, time, place, meetupId]

    const isOwnerOfCurrentMeetup = await isOwner(meetupId, userId)

    if (!isOwnerOfCurrentMeetup) {
      throw new Error('You don\'t have access')
    }

    return await pool.query(sqlQuery, valuesQuery)
  }

  async deleteMeetup(meetupId, userId) {
    const sqlQuery = 'DELETE FROM meetups where id = $1'
    const valuesQuery = [meetupId]

    const isOwnerOfCurrentMeetup = await isOwner(meetupId, userId)

    if (!isOwnerOfCurrentMeetup) {
     throw new Error('You don\'t have access')
    }

    return await pool.query(sqlQuery, valuesQuery)
  }
}

export const meetupService = new MeetupService()