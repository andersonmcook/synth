'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.set('view engine', 'jade')

app.use(express.static('public'))

app.locals.options = {
  title: "synth"
}

app.get('/', (req, res) => {
  res.render('synth')
})

server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})

ws.on('connection', socket => {
  console.log('server socket connected', socket.id)

// passes around sounds
  socket.on('sendSound', sound => {
    console.log('sound', sound)
    socket.broadcast.emit('receiveSound', sound)
  })

// passes around chats
  socket.on('sendChat', msg => {
    console.log('msg', msg)
    socket.broadcast.emit('receiveChat', [msg])
  })
})
