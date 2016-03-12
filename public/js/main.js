;(function () {
  'use strict'
  console.log('in main.js')

  // SOCKETS
  const ws = io.connect()

  ws.on('connect', () => {
    console.log('browser socket connected')
  })

  ws.on('receiveSound', sound => {
    console.log(sound)
    receiveSound(sound)
  })

  //in a function
     // ws.emit('sendChat', chat) // here chat is an object with a name and text key

  // END SOCKETS

  // AUDIO CONTEXT
  window.AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    alert("Sorry, your browser doesn't support the Web Audio APIs.")
    throw new Error("Sorry, your browser doesn't support the Web Audio APIs. Execution Aborted.") // ABORT ALL
  }

  // default
  const audio = new AudioContext()
  const gain = audio.createGain()
  gain.gain.value = 0.5;

  // adjust volume
  function volume () {
    console.log('slider', slider.value)
    gain.gain.value = slider.value
    volumeText.innerHTML = slider.value
  }
  // function testSound () {
  //   const osc = audio.createOscillator();
  //   osc.type = "square";
  //   osc.frequency.value = 3000;
  //   osc.connect(gain);
  // }
  // END AUDIO CONTEXT

  // TEST
  // const osc = audio.createOscillator()


  // LISTENERS
  const slider = document.getElementById('slider')
  slider.addEventListener('input', volume)

  const test = document.getElementById('test')
  test.addEventListener('click', testFunc)

  const kill = document.getElementById('kill')
  kill.addEventListener('mouseover', killer)

  const hertz = document.getElementById('hertz')
  hertz.addEventListener('input', testFunc)

  const xy = document.getElementById('xy')
  xy.addEventListener('mousemove', box)

  const shape = document.getElementById('shape')
  shape.addEventListener('change', getter(shape))

  const hertzText = document.getElementById('hertzText')
  const volumeText = document.getElementById('volumeText')
  // LISTENERS END

  // gets wave shape from select options
  // function shaper () {
  //   // console.log(shape.value)
  //   return shape.value
  // }

  // a getter that can get lots of things
  function getter (element) {
    return element.value
  }


    const osc = audio.createOscillator()
    osc.start()

  function testFunc (sound) {
    gain.connect(audio.destination)
    console.log('clicked')
    // const slider = document.getElementById('slider')
    // console.log('slider', slider.value)
    console.log('hertz', hertz.value)
    // osc.type = "square";
    // osc.type = shaper()
    const gotHertz = getter(hertz)

    osc.type = getter(shape)

    // osc.frequency.value = hertz.value || 100
    osc.frequency.value = gotHertz || 100
    // osc.frequency.value = sound.frequency || gotHertz
    osc.connect(gain);
    hertzText.innerHTML = gotHertz
    // hertzText.innerHTML = sound.frequency || gotHertz
    const soundToSend = {frequency: gotHertz, shape: getter(shape)}
    console.log('testFunc soundToSend', soundToSend)
    // if (!sound) {
      ws.emit('sendSound', soundToSend)
    // }
  }

  function receiveSound (sound) {
    gain.connect(audio.destination)
    // const osc = audio.createOscillator()
    // osc.start()
    // console.log('clicked')
    // const slider = document.getElementById('slider')
    // console.log('slider', slider.value)
    // console.log('hertz', hertz.value)
    // osc.type = "square";
    // osc.type = shaper()
    // const gotHertz = getter(hertz)

    // osc.type = getter(shape)
    osc.type = sound.shape

    // osc.frequency.value = hertz.value || 100
    // osc.frequency.value = gotHertz || 100
    osc.frequency.value = sound.frequency
    osc.connect(gain);
    // hertzText.innerHTML = gotHertz
    hertzText.innerHTML = sound.frequency
    // const soundToSend = {frequency: gotHertz}
    // console.log('testFunc soundToSend', soundToSend)
  }

    // const osc = audio.createOscillator()
    // osc.start()
  function box (e) {
    // console.log(e)
    gain.connect(audio.destination)
    // console.log(e.clientX)
    // osc.type = "square";
    // osc.type = shaper()
    osc.type = getter(shape)
    osc.frequency.value = e.clientX / 3
    osc.connect(gain);
    const soundToSend = {frequency: (e.clientX / 3), shape: getter(shape)}
    ws.emit('sendSound', soundToSend)
  }


  function killer () {
    // const osc = audio.createOscillator()
    osc.frequency.value = 0
    gain.disconnect(audio.destination)
  }
  // END TEST



})();
