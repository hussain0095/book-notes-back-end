const express = require('express')
const Book = require('../models/Book')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true })
    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:bookId', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId)
    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router