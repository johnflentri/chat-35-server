const express = require('express')
const Sse = require('json-sse')
const cors = require('cors')
const app = express()
const port = 4000

// app.get('/', (req, res) => res.send('Hello World!'))

const db = {}

db.messages = []

const corsMiddleware = cors()
app.use(corsMiddleware)

const parser = express.json()
app.use(parser)

const stream = new Sse()

app.get('/stream', (request, response) => {
  stream.updateInit(db.messages)
  stream.init(request, response)
})

app.post(
  '/message',
  (request, response) => {
    const { text } = request.body

    db.messages.push(text)

    response.send(text)

    stream.send(text)

    console.log('db test:', db)
  }
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))