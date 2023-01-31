import Component from '../classes/Component'

import gsap from 'gsap'

import each from 'lodash/each'

export default class Preloader extends Component {
  constructor () {
    super({
      element: '.preloader',
      elements: {
        text: '.preloader__text',
        number: '.preloader__number',
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
      this.elements.number.innerHTML = this.currentPercent + '%'

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
        delay: 1,
        onComplete: () => this.emit('completed')
      }).to(this.element, { autoAlpha: 0 })
    })
  }

  destroy () {
    this.element.parentElement.removeChild(this.element)
  }
}
