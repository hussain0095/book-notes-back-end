require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const authRoutes = require('./routes/auth')
const bookRoutes = require('./routes/books')
const categoryRoutes = require('./routes/categories')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/auth', authRoutes)
app.use('/books', bookRoutes)
app.use('/categories', categoryRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error.message)
  })

app.get('/', (req, res) => {
  res.json({
    message: 'Book Notes API Running'
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})