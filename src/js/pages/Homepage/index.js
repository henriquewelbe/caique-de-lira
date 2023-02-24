import Page from '../../classes/Page'
import { gsap, Sine } from 'gsap'
export default class Homepage extends Page {
  constructor () {
    super({
      id: 'homepage',
      element: '.homepage',
      elements: { }
    })
  }

  show () {
    super.show()

    gsap.to(
      this.elements.ball, {
        width: '31.25rem',
        duration: 3,
        ease: Sine.easeOut
      })

    gsap.to(
      this.elements.ballWrapper, {
        bottom: '50%',
        y: '35%',
        duration: 3
      }
    )

    gsap.to(
      this.elements.ballWrapper, {
        y: '50%',
        delay: 1,
        duration: 2.5
      }
    )
  }
}
