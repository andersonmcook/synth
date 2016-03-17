;(function () {
  'use strict'

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('receiveChat socket connected')
  })

  ws.on('receiveChat', msgs => {
    msgs.forEach(displayChat)
  })

  const form = document.querySelector('#chat-form')
  const name = document.querySelector('#chat-name')
  const text = document.querySelector('#chat-text')
  const ul = document.querySelector('#chat-list')

// listen for submit, run displayChat, reset text value, prevent page reload
  form.addEventListener('submit', () => {
    const chat = {name: name.value, text: text.value}
    ws.emit('sendChat', chat) // before because displayChat resets text.value
    displayChat(chat)
    text.value = ''
    event.preventDefault()
  })

// display chat on page
  function displayChat (chat) {
      const li = generateLI(chat)
      li.classList.add("chats", "list-group-item")
      ul.appendChild(li)
  }

// generate list item
  function generateLI (chat) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${chat.name}: ${chat.text}
      (${getTime()})`)
    li.appendChild(textNode)
    return li
  }

// get time
  function getTime () {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  }

})();
