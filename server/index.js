require('dotenv').config()
const express = require('express')
const app = express()
const events = require('events')
const e = require("express");
const PORT = process.env.PORT
const emitter = new events.EventEmitter()

app.use(require('cors')())

app.get('get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})

app.post('new-messages', (req, res) => {
    const message = req.body
    emitter.emit('newMessage', message)

    res.status(200)
})

app.listen(PORT, () => {
    console.log('Server started')
})