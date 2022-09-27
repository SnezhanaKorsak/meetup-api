import express from 'express';
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'

import meetupsRoutes from './routes/meetups.js';
import authRoutes from './routes/auth.js';
import fs from "fs";

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger/openapi.json'))
const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', meetupsRoutes);
app.use('/auth', authRoutes);
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
