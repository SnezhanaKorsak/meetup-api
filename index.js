import express from 'express'

import meetupsRoutes from './routes/meetups.js'

const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json())
app.use('/api', meetupsRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})
