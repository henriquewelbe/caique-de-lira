import Page from '../../classes/Page'
import { gsap } from 'gsap'

export default class About extends Page {
  constructor () {
    super({
      id: 'about',
      element: '.about',
      elements: {
        ball: '.preloader__ball'
      }
    })
  }

  create () {
    super.create()
  }

  show () {
    super.show()

    gsap.to(this.elements.ball, {
      width: '39.25rem',
      duration: 3
    })

    gsap.to(this.elements.ballWrapper, {
      bottom: '0%',
      y: '50%',
      duration: 3
    })
  }

  closeNavbar () {
    super.closeNavbar()

    gsap.to(this.elements.ball, {
      width: '39.25rem',
      duration: 3
    })

    gsap.to(this.elements.ballWrapper, {
      bottom: '0%',
      y: '50%',
      duration: 3
    })
  }
}
