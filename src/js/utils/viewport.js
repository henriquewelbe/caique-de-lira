export default {
  get width () {
    return window.innerWidth
  },

  get height () {
    return window.innerHeight
  },

  get devicePixelRatio () {
    return window.devicePixelRatio || 1
  }
}
