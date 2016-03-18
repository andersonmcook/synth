'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.set('view engine', 'jade')

app.use(express.static('public'))

app.locals.options = {
  title: "synth",
  users: 0
}

// get home
app.get('/', (req, res) => {
  res.render('synth')
})

// use req.params to create a new room
app.get('/:room', (req, res) => {
  // console.log('the room someone is in:', req.params.room)
  res.render('synth', {room: req.params.room})
})

server.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})

// WEB SOCKETS
ws.on('connection', socket => {
  console.log('server socket connected', socket.id)

// ROOM TEST

  socket.on('room', room => {
    socket.join(room);
    // console.log('server in room: ', room)
  })

// END ROOM TEST



// passes around sounds
  // socket.on('sendSound', sound => {
  //   console.log('sound', sound)
  //   socket.broadcast.emit('receiveSound', sound)
  // })

// passes around notes
  socket.on('sendNotes', (room, notes) => {
    // console.log('server room', room)
    // console.log('server notes', notes)
    socket.broadcast.to(room).emit('receiveNotes', notes)
  })

// passes around chats
  socket.on('sendChat', (room, msg) => {
    // console.log('server room', room)
    // console.log('server msg', msg)
    // socket.broadcast.emit('receiveChat', [msg])
    socket.broadcast.to(room).emit('receiveChat', [msg])
  })

  // socket.on('connect', socket => {
  //   console.log("before ++", app.locals.options.users);
  //   app.locals.options.users++
  //   console.log("after ++", app.locals.options.users);
  // })

  // socket.on('disconnect', socket => {
  //   console.log('socket disconnected', socket)
  //   console.log("before --", app.locals.options.users);
  //   app.locals.options.users--
  //   console.log("after --", app.locals.options.users);
  // })
})

