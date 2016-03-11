;(function () {
console.log('in main.js')

// AUDIO CONTEXT
window.AudioContext = window.AudioContext || window.webkitAudioContext

if (!AudioContext) {
  alert("Sorry, your browser doesn't support the Web Audio APIs.")
  throw new Error("Sorry, your browser doesn't support the Web Audio APIs. Execution Aborted.") // ABORT ALL
}

const audio = new AudioContext()
const gain = audio.createGain()
gain.gain.value = 0.5;

// function testSound () {
//   const osc = audio.createOscillator();
//   osc.type = "square";
//   osc.frequency.value = 3000;
//   osc.connect(gain);
// }
// END AUDIO CONTEXT

// TEST
// const osc = audio.createOscillator()

const test = document.getElementById('test')
test.addEventListener('click', testFunc)

const kill = document.getElementById('kill')
kill.addEventListener('mouseover', killer)

const hertz = document.getElementById('hertz')
hertz.addEventListener('input', testFunc)

const xy = document.getElementById('xy')
xy.addEventListener('mousemove', box)


  const osc = audio.createOscillator()
  osc.start()
function testFunc () {
  gain.connect(audio.destination)
  console.log('clicked')
  const slider = document.getElementById('slider')
  console.log('slider', slider.value)
  console.log('hertz', hertz.value)
  osc.type = "square";

  osc.frequency.value = hertz.value || 100
  osc.connect(gain);



}

function box (e) {
  gain.connect(audio.destination)
  console.log(e.clientX)
  osc.type = "square";

  osc.frequency.value = e.clientX
  osc.connect(gain);
}


function killer () {
  // const osc = audio.createOscillator()
  gain.disconnect(audio.destination)
}
// END TEST



})();
