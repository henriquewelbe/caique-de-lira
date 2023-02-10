import each from 'lodash/each'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
  constructor ({ element, elements }) {
    super()
    this.selectors = {
      element,
      elements: {
        ...elements
      }
    }

    this.create()
    this.addEventListeners()
  }

  create () {
    if (this.selectors.element instanceof window.HTMLElement) {
      this.element = this.selectors.element
    } else {
      this.element = document.querySelector(this.selectors.element)
    }

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
  }

  addEventListeners () {

  }

  removeEventListeners () {

  }
}
