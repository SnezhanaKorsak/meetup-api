import express from 'express';
import cookieParser from 'cookie-parser'

import meetupsRoutes from './routes/meetups.js';
import authRoutes from './routes/auth.js';

const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', meetupsRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
