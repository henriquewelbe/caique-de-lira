import each from 'lodash/each'
import gsap from 'gsap'
import Link from '../components/Link'
import Title from '../animations/Title'
import { mapEach } from '../utils/dom'

export default class Page {
  constructor ({ id, element, elements }) {
    this.id = id
    this.selectors = {
      element,
      elements: {
        ...elements,

        ball: '.preloader__ball img',
        ballWrapper: '.preloader__ball'
        // animationsTitles: document.querySelectorAll('main [data-animation="title"]'),
        // animationLinks: document.querySelectorAll('main [data-animation="link"]')
      }
    }
  }

  create () {
    this.element = document.querySelector(this.selectors.element)
    this.elements = {}

    each(this.selectors.elements, (selector, key) => {
      if (selector instanceof window.HTMLElement || selector instanceof window.NodeList || Array.isArray(selector)) {
        this.elements[key] = selector
      } else {
        this.elements[key] = document.querySelectorAll(selector)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(selector)
        }
      }
    })

    gsap.set(this.element, { autoAlpha: 0 })

    this.createAnimations()

    window.navbar.on('closed', () => {
      this.closeNavbar()
    })
  }

  createAnimations () {
    this.selectors.elements.animationsTitles = document.querySelectorAll('main [data-animation="title"]')
    this.animationsTitles = mapEach(this.selectors.elements.animationsTitles, element => {
      return new Title({
        element,
        centered: element.hasAttribute('data-centered')
      })
    })

    this.selectors.elements.animationLinks = document.querySelectorAll('main [data-animation="link"]')
    this.animationLinks = mapEach(this.selectors.elements.animationLinks, element => {
      return new Link({
        element
      })
    })
  }

  show () {
    return new Promise(resolve => {
      gsap.killTweensOf(this.elements.ball)
      gsap.killTweensOf(this.elements.ballWrapper)

      gsap.to(this.element,
        {
          autoAlpha: 1,
          duration: 1,
          delay: 0.5,
          onComplete: resolve
        }
      )
    })
  }

  hide () {
    return new Promise(resolve => {
      gsap.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      })
    })
  }

  closeNavbar () {
    gsap.killTweensOf(this.elements.ball)
    gsap.killTweensOf(this.elements.ballWrapper)
  }
}
