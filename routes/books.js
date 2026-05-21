const express = require('express')
const Book = require('../models/Book')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const book = await Book.create({
      ...req.body,
      owner: req.user.id
    })

    res.status(201).json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id })

    res.json(books)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      owner: req.user.id
    })

    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id
      },
      req.body,
      { new: true }
    )

    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    })

    res.json(book)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router