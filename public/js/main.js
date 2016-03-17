;(function () {
  'use strict'
  console.log('in main.js')

// SOCKETS
  const ws = io.connect()

  ws.on('connect', () => {
    console.log('browser socket connected')
  })

  ws.on('receiveSound', sound => {
    // console.log(sound)
    receiveSound(sound)
  })

  ws.on('receiveNotes', notes => {
    // console.log(notes)
    receiveNotes(notes)
  })

// END SOCKETS

// AUDIO CONTEXT
  window.AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    alert("Sorry, your browser doesn't support the Web Audio APIs.")
    throw new Error("Sorry, your browser doesn't support the Web Audio APIs. Execution Aborted.") // ABORT ALL
  }

  // default
  // const audio = new AudioContext()
  const audio = new (window.AudioContext || window.webkitAudioContext)()
  const gain = audio.createGain()
  const analyser = audio.createAnalyser()
  gain.gain.value = 0.5;
  gain.connect(audio.destination)
  // audio.connect(analyser)

  // adjust volume
  function volume () {
    // console.log('slider', slider.value)
    gain.gain.value = slider.value
    volumeText.innerHTML = slider.value
  }

  // display values
  function updateDisplay (element, control) {
    // console.log(element, control)
    // console.log('in updateDisplay')
    element.innerHTML = control.value
  }

// END AUDIO CONTEXT

// TEST



// the problem right now is that the bars aren't going down after a certain time
// also i'd like the notes to be spaced out more
// the canvas will disappear when i go to a new program
// ANALYZER TEST
var canvas = document.querySelector('canvas');
var canvasWidth = canvas.width = window.innerWidth - 40;
var canvasHeight = canvas.height = 300;
var ctx = canvas.getContext('2d');

// commented out for a second
var analyzer = audio.createAnalyser()

gain.connect(analyzer)

analyzer.minDecibels = -90;
analyzer.maxDecibels = -10;
analyzer.smoothingTimeConstant = 0.85;

// analyzer.fftSize = 512;
analyzer.fftSize = 2048
var bufferLength = analyzer.frequencyBinCount;
var dataArray = new Uint8Array( bufferLength );


ctx.fillStyle = 'white';
ctx.fillRect( 0, 0, canvasWidth, canvasHeight );

function render() {
  analyzer.getByteFrequencyData( dataArray );

  // shift down
  var canvasImageData = ctx.getImageData( 0, 0, canvasWidth, canvasHeight );
  ctx.putImageData( canvasImageData, 0, 6 );

  ctx.fillStyle = 'black';
  ctx.fillRect( 0, 0, canvasWidth, canvasHeight );

  var barWidth = Math.ceil( canvasWidth / bufferLength * 16);

  for ( var i = 0; i < bufferLength; i++ ) {
    var x = Math.floor( i * barWidth);
    // var x = Math.floor (i * barWidth * 2)
    var amp = dataArray[i] / 200; // should be 256
    // var amp = dataArray[i] / 256
    var hue = Math.round( amp * 210 + 210 );
    var sat = 50 + ( 1- amp) * 50;
    var alpha = amp
    ctx.fillStyle = 'hsla(' + hue + ', 100%, ' + 50 + '%, ' + 1 + ')';
    var barHeight = amp * canvasHeight;
    var y = canvasHeight - barHeight;
    ctx.fillRect( x, y, barWidth, barHeight );
  }

  requestAnimationFrame( render );
}

render();






// END ANALYZER TEST


// LISTENERS

  // label spans
  const hertzText = document.getElementById('hertzText')
  const volumeText = document.getElementById('volumeText')
  const osc1detune = document.getElementById('osc1detune')
  const osc2detune = document.getElementById('osc2detune')
  const slider = document.getElementById('slider')

  slider.addEventListener('input', volume)

  // should only listen when this div has focus so typing in chat doesn't trigger sounds
  const pageContentWrapper = document.getElementById('page-content-wrapper')
  // keydown function
  pageContentWrapper.addEventListener('keydown', pressKey)
  // keyup function
  pageContentWrapper.addEventListener('keyup', releaseKey)

  // shape 1 listener
  const shape = document.getElementById('shape')
  shape.addEventListener('change', getter(shape))

  // detune 1 listener
  const detune1 = document.getElementById('detune1')
  // detune1.addEventListener('change', getter(detune1))
  // detune1.addEventListener('change', updateDisplay(osc1detune, detune1))
  detune1.addEventListener('change', function () {
    getter(detune1)
    updateDisplay(osc1detune, detune1)
  })

  // detune 2 listener
  const detune2 = document.getElementById('detune2')
  // detune2.addEventListener('change', getter(detune2))
  // detune2.addEventListener('change', updateDisplay(osc2detune, detune2))
  detune2.addEventListener('change', function () {
    getter(detune2)
    updateDisplay(osc2detune, detune2)
  })

  // oscillator 2 listener
  const shape2 = document.getElementById('shape2')
  shape2.addEventListener('change', getter(shape2))


  // tempo listener
  const tempo = document.getElementById('tempo')
// LISTENERS END



  // a getter that can get lots of things
  function getter (element) {
    if (element.id === 'tempo') {
      // return element.value
      // console.log('element2', element)
      return element.value >= element.min && element.value <= element.max ? element.value : element.value = g120
    }
    return element.value
  }

// receive sound from another socket
  function receiveSound (sound) {
    // console.log('received', sound)
    gain.connect(audio.destination)
    const osc = audio.createOscillator()
    osc.start()
    osc.type = sound.shape
    osc.frequency.value = sound.frequency
    osc.connect(gain);
    // hertzText.innerHTML = sound.frequency
  }

// END TEST

// KEYS

  const frequencyByKey = {
    65: 261.626, // C4
    87: 277.183, // C#4
    83: 293.665, // D4
    69: 311.127, // D#4
    68: 329.628, // E4
    70: 349.228, // F4
    84: 369.994, // F#4
    71: 391.995, // G4
    89: 415.305, // G#4
    72: 440.000, // A4
    85: 466.164, // A#4
    74: 493.883, // B4
    75: 523.251, // C5
    79: 554.365, // C#5
    76: 587.330, // D5
    80: 622.254 // D#5
  }

  const nameByKey = {
    65: "C4",
    87: "C#4",
    83: "D4",
    69: "D#4",
    68: "E4",
    70: "F4",
    84: "F#4",
    71: "G4",
    89: "G#4",
    72: "A4",
    85: "A#4",
    74: "B4",
    75: "C5",
    79: "C#5",
    76: "D5",
    80: "D#5"
  }

  let nodes = [];

  // you need to think about when someone is chatting that this is not triggered
  // keydown press
  function pressKey (event) {
    // console.log('in press key')
    // console.log(event.keyCode)
    let alreadyPressed = false;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].code === event.keyCode) {
        alreadyPressed = true
        break
      }
    }
    if (event.keyCode >= 65 && event.keyCode <= 90 && !alreadyPressed) {

      // context test
      // const audio = new (window.AudioContext || window.webkitAudioContext)()
      // const gain = audio.createGain()
      // const analyser = audio.createAnalyser()
      // gain.gain.value = 0.5;
      // gain.connect(audio.destination)
      // end context test


      const startNote = new Date()
      const osc = audio.createOscillator()
      const beat = 60 / (getter(tempo) * 4)
      // test for 2 oscillators
      const osc2 = audio.createOscillator()
      osc2.type = getter(shape2)
      osc2.frequency.value = frequencyByKey[event.keyCode]
      osc2.detune.value = getter(detune2)
      // gain.gain.linearRampToValueAtTime(1, audio.currentTime + beat)
      // gain.gain.value = 0.5
      // gain.gain.linearRampToValueAtTime(0, audio.currentTime + 10)
      osc2.connect(gain)
      osc2.start(0)
      osc2.stop(audio.currentTime + beat)
      // end test
      osc.type = getter(shape)
      osc.frequency.value = frequencyByKey[event.keyCode]
      osc.detune.value = getter(detune1)
      // console.log('detune.value', osc.detune.value)
      // console.log('detune.value', osc2.detune.value)
      osc.connect(gain)
      osc.start(0)
      // HEY MAYBE YOU SHOULD HAVE IT WHERE YOU CAN SELECT THE NOTE LENGTH TOO
      osc.stop(audio.currentTime + beat)
      // testing length
      // const beat = getter(tempo) / 60 / 16
      nodes.push({code: event.keyCode, node: osc, length: startNote})
      // const notesToSend = {frequency: frequencyByKey[event.keyCode], shape: getter(shape), notes: nodes, beat: beat }
      const notesToSend = {frequency: osc.frequency.value, shape1: osc.type, shape2: osc2.type, notes: nodes, beat: beat, detune1: osc.detune.value, detune2: osc2.detune.value}
      // console.log("notes", notesToSend)
      ws.emit('sendNotes', notesToSend)

    }
  }



  function receiveNotes (notes) {
    const osc = audio.createOscillator()
    // osc.type = getter(shape)
    osc.type = notes.shape1
    // osc.frequency.value = frequencyByKey[event.keyCode]
    osc.frequency.value = notes.frequency
    osc.detune.value = notes.detune1
    osc.connect(gain)
    // const beat = getter(tempo) / 60 / 16

    // second note
    const osc2 = audio.createOscillator()
    osc2.type = notes.shape2
    osc2.frequency.value = notes.frequency
    osc2.detune.value = notes.detune2
    osc2.connect(gain)
    // end second note

    osc.start(0)
    osc2.start(0)

    osc.stop(audio.currentTime + notes.beat)
    osc2.stop(audio.currentTime + notes.beat)

    // console.log('received notes', notes)
  }

  function releaseKey (event) {
    // console.log('released key')
    const garbage = []
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].code === event.keyCode) {
        nodes[i].node.stop(0)
        nodes[i].node.disconnect()
        // testing end note
        const endNote = new Date()
        nodes[i].length = endNote - nodes[i].length
        // console.log('nodes i dot length', nodes[i].length)
        ws.emit('sendNoteEnd')
        // end testing
        garbage.push(i)
      }
    }
    for (let i = 0; i < garbage.length; i++) {
      nodes.splice(garbage[i], 1)
    }
  }





// END KEYS


})();
