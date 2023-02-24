import Animations from '../classes/Animations'
import gsap from 'gsap'
import { split } from '../utils/text'

export default class Title extends Animations {
  constructor ({ element, centered = false }) {
    super({ element, elements: {} })

    this.centered = centered

    this.text = []

    this.elements.spansWrapper = split({
      element: this.element,
      expression: '<br>'
    })

    this.elements.spansWrapper.forEach(element => {
      this.elements.headingSpans = split({
        append: false,
        element,
        expression: '<br>'
      })
      this.text.push(...this.elements.headingSpans)
    })
  }

  animateIn () {
    super.animateIn()

    gsap.timeline({ delay: 1.2 })
      .fromTo(this.text, {
        y: '100%',
        autoAlpha: 0
        // rotateX: 500
      }, {
        y: '0%',
        autoAlpha: 1,
        // rotateX: 0,
        duration: 0.8,
        stagger: 0.1
      })
      .fromTo(this.elements.spansWrapper, {
        height: '3em',
        autoAlpha: 0
      }, {
        height: this.elements.spansWrapper[0].querySelector('span').scrollHeight,
        autoAlpha: 1,
        stagger: 0.2,
        duration: 1.2
      }, '<')
      .fromTo(this.elements.spansWrapper, {
        rotateX: 90
      }, {
        rotateX: 0,
        duration: 0.5
      }, '<')
      .fromTo(this.element, {
        y: '70%',
        width: '100%',
        scaleX: 0.7
      }, {
        scaleX: 1,
        y: this.centered ? '-50%' : '0%',
        duration: 1,
        delay: 0.1
      }, '<')
  }
}
