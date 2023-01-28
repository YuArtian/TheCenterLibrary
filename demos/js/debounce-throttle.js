


function debounce(fn, during, immediate) {
  let time
  return function () {
    time && clearTimeout(time)
    if (immediate) {
      fn.apply(this, arguments)
    }
    time = setTimeout(() => {
      fn.apply(this, arguments)
    }, during)
  }
}
const click = function (e) {
  console.log('click!!!!', e)
}

button_debounce.addEventListener('click', debounce(click, 2000, false))


function throttle(fn, during) {
  let start = new Date().valueOf()
  return function () {
    let now = new Date().valueOf()
    if (now - start >= during) {
      fn.apply(this, arguments)
      start = now
    }
  }
}
button_throttle.addEventListener('click', throttle(click, 1000))