import * as dotenv from 'dotenv'
import postgres from 'pg'
const { Pool } = postgres

dotenv.config()

export const pool = new Pool({
  user: "postgres",
  password: process.env.POSTGRESQL_PASSWORD,
  host: "localhost",
  port: 5005,
  database: 'meetups'
})