import Lenis from '@studio-freight/lenis'

export default class Scroll extends Lenis {
  constructor () {
    super({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    })

    window.requestAnimationFrame((time) => this.update(time))
  }

  update (time) {
    super.raf(time)
    window.requestAnimationFrame((time) => this.update(time))
  }
}
