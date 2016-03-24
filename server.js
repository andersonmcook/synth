'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.set('view engine', 'jade')

app.use(express.static('public'))

app.locals.options = {
  title: "Synth Sockets",
  users: 0
}

// get home
app.get('/', (req, res) => {
  res.render('synth')
})

// use req.params to create a new room
app.get('/:room', (req, res) => {
  res.render('synth', {room: req.params.room})
})

// listen
server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})

// WEB SOCKETS
ws.on('connection', socket => {
  console.log('server socket connected', socket.id)

// socket join a room based on front end emission
  socket.on('room', room => {
    socket.join(room);
  })

// passes around notes
  socket.on('sendNotes', (room, notes) => {
    socket.broadcast.to(room).emit('receiveNotes', notes)
  })

// passes around chats
  socket.on('sendChat', (room, msg) => {
    socket.broadcast.to(room).emit('receiveChat', [msg])
  })
})
// END WEB SOCKETS

