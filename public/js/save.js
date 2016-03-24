;(function () {
  $(document).ready(function() {
    'use strict'
    console.log('in save.js')

    let history = JSON.parse(localStorage.getItem("synth-sockets-presets"))
    console.log(history)

    $.each()

// save presets to local storage
    function savePreset (event) {
      event.preventDefault()
      const history = JSON.parse(localStorage.getItem("synth-sockets-presets")) || {};
      const name = $('#new-preset').val()
      if (history.hasOwnProperty(name) === false) {
        history[name] = {
          shape: $('#shape').val(),
          shape2: $('#shape2').val(),
          detune1: $('#detune1').val(),
          detune2: $('#detune2').val(),
          tempo: $('#tempo').val()
        }
        localStorage.setItem('synth-sockets-presets', JSON.stringify(history))
      }
      console.log('saved preset')
    }

// load preset into synth
    function loadPreset () {
      const preset = history[$('#presets').val()]
      $('#shape').val(preset.shape)
      $('#shape2').val(preset.shape2)
      $('#detune1').val(preset.detune1)
      $('#osc1detune').text(preset.detune1)
      $('#detune2').val(preset.detune2)
      $('#osc2detune').text(preset.detune2)
      $('#tempo').val(preset.tempo)
      console.log('preset', preset)
    }

// save presets click handler
    $('#save-preset').click(function () {
      savePreset(event)
    })

// load preset change handler
    $('#presets').change(function () {
      loadPreset()
    })


  })
})();
