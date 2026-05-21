const express = require('express')
const Category = require('../models/Category')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const category = await Category.create(req.body)

    res.status(201).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const categories = await Category.find()

    res.json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router