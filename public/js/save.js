;(function () {
  $(document).ready(function() {
    'use strict'

// load history
    let history = JSON.parse(localStorage.getItem("synth-sockets-presets")) || {}

// put history into presets select
    $.each(history, function (key, value) {
      $('#presets').append($('<option />').val(key).text(key))
    })

// save presets to local storage
    function savePreset (event) {
      event.preventDefault()
      // history = JSON.parse(localStorage.getItem("synth-sockets-presets")) || {}
      const name = $('#new-preset').val()
      // if (history.hasOwnProperty(name) === false) {
        history[name] = {
          shape: $('#shape').val(),
          shape2: $('#shape2').val(),
          detune1: $('#detune1').val(),
          detune2: $('#detune2').val(),
          tempo: $('#tempo').val()
        }
        localStorage.setItem('synth-sockets-presets', JSON.stringify(history))
        $('#presets').append($('<option />').val(name).text(name))
        // history = history
      // }
      $('#new-preset').val('')
      // console.log('saved preset')
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
      // console.log('preset', preset)
      $('#page-content-wrapper').focus()
    }

// stop listening to typing in #new-preset
    $('#new-preset').keydown(function (event) {
      event.stopPropagation()
    })

// stop listening to typing, but also check to see if the new preset is named the same as a previous one
    $('#new-preset').keyup(function (event) {
      event.stopPropagation()
      const array = $('#presets').children()
      for (let i = 0; i < array.length; i++) {
        if ($('#new-preset').val() === array[i].innerText) {
          $('#save-preset').val('Overwrite')
          break
        } else {
          $('#save-preset').val('Save Preset')
        }
      }
    })

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
