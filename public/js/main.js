;(function () {
  console.log('in main.js')

  // TEST
  const test = document.getElementById('test')
  test.addEventListener('click', testFunc)

  function testFunc () {
    console.log('clicked')
    const slider = document.getElementById('slider')
    console.log('slider', slider.value)
  }
  // END TEST



})();
