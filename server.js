'use strict'

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.set('view engine', 'jade')

app.use(express.static('public'))

app.locals.options = {
  title: "synth"
}

app.get('/', (req, res) => {
  res.render('synth')
})

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})
