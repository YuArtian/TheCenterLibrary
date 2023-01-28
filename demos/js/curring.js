
function curring(fn, arr=[]) {
  let length = fn.length
  return (...args) => {
    let a = [...arr, ...args]
    return a.length === length ? fn(...a) : curring(fn, a)
  }
}