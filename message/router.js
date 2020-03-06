const express = require('express')
const db = require('../db')
const stream = require('../stream')

const { Router } = express

const router = Router()

router.post(
  '/channel',
  (request, response) => {
    const { name } = request.body

    db.messages.push(name)

    response.send(name)

    const action = {
      type: 'NEW_CHANNEL',
      payload: name
    }

    stream.send(action)
  }
)

module.exports = router