import gsap from 'gsap'
import { split } from '../utils/text'
import Component from '../classes/Component'

export default class Link extends Component {
  constructor ({ element, elements }) {
    super({
      element,
      elements: {}
    })

    const { innerHTML } = this.element.querySelector('span')

    this.elements.text = document.createElement('div')
    this.elements.text.innerHTML = innerHTML
    this.elements.textSpans = split({
      append: false,
      element: this.elements.text,
      expression: ''
    })

    this.elements.hover = document.createElement('div')
    this.elements.hover.innerHTML = innerHTML
    this.elements.hoverSpans = split({
      append: false,
      element: this.elements.hover,
      expression: ''
    })

    this.element.innerHTML = ''
    this.element.appendChild(this.elements.text)
    this.element.appendChild(this.elements.hover)

    if (this.element.getAttribute('data-animation-position') === 'center') {
      gsap.set(this.elements.hover, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: '-50%',
        y: '-50%'
      })
    } else {
      gsap.set(this.elements.hover, {
        left: 0,
        position: 'absolute',
        top: 0
      })
    }

    this.timeline = gsap.timeline({ paused: true })

    this.timeline.to(this.elements.textSpans, {
      duration: 0.3,
      y: '-110%',
      stagger: 0.02
    }, 0)

    this.timeline.fromTo(this.elements.hoverSpans, {
      y: '100%'
    }, {
      duration: 0.3,
      y: '-10%',
      stagger: 0.02
    }, 0.05)

    this.addEventListener()
  }

  onMouseEnter () {
    this.timeline.play()
  }

  onMouseLeave () {
    this.timeline.reverse()
  }

  addEventListener () {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this)
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this)

    this.element.addEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.addEventListener('mouseleave', this.onMouseLeaveEvent)
  }

  removeEventListener () {
    this.element.removeEventListener('mouseenter', this.onMouseEnterEvent)
    this.element.removeEventListener('mouseleave', this.onMouseEnterEvent)
  }
}
