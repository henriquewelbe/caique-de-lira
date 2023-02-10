import Component from '../classes/Component'

import { gsap, Sine } from 'gsap'

import each from 'lodash/each'

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        background: document.querySelectorAll('.preloader__ball img'),
        images: document.querySelectorAll('img')
      }
    })
    this.length = 0
    this.currentPercent = 0
    this.realPercent = 0
    this.createLoader()
  }

  createLoader () {
    if (this.elements.images.length === 0) this.onImageLoaded()

    each(this.elements.images, image => {
      const cachedSrc = image.src
      image.src = ''
      image.onload = () => this.onImageLoaded()
      image.src = cachedSrc
    })
  }

  onImageLoaded () {
    this.length++
    this.realPercent = Math.round(this.length / this.elements.images.length * 100)
    this.animatePercentages()
  }

  animatePercentages () {
    if (this.currentPercent < 100) {
      this.currentPercent++

      if (this.currentPercent <= this.realPercent) {
        window.requestAnimationFrame(() => this.animatePercentages())
      }
    } else {
      this.completeAll()
    }
  }

  completeAll () {
    return new Promise(() => {
      gsap.timeline({
        onStart: () => this.emit('completed'),
        onComplete: this.elements.background.forEach(background => { background.style.animation = 'rotateBall 24s linear infinite, scaleBall 10s linear infinite' })
      })
        .to(
          this.elements.background,
          { width: '31.25rem', duration: 3, ease: Sine.easeOut }
        )
    })
  }

  destroy () {
    this.element.parentElement.removeChild(this.element)
  }
}
