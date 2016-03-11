;(function () {
console.log('in main.js')

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
shape.addEventListener('change', shaper)
// LISTENERS END


function shaper () {
  console.log(shape.value)
  return shape.value
}


  const osc = audio.createOscillator()
  osc.start()

function testFunc () {
  gain.connect(audio.destination)
  console.log('clicked')
  // const slider = document.getElementById('slider')
  // console.log('slider', slider.value)
  console.log('hertz', hertz.value)
  // osc.type = "square";
  osc.type = shaper()

  osc.frequency.value = hertz.value || 100
  osc.connect(gain);

}

  // const osc = audio.createOscillator()
  // osc.start()
function box (e) {
  gain.connect(audio.destination)
  // console.log(e.clientX)
  // osc.type = "square";
  osc.type = shaper()

  osc.frequency.value = e.clientX / 3
  osc.connect(gain);
}


function killer () {
  // const osc = audio.createOscillator()
  osc.frequency.value = 0
  gain.disconnect(audio.destination)
}
// END TEST



})();
