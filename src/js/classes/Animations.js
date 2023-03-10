import Component from './Component'

export default class Animations extends Component {
  constructor ({ element, elements }) {
    super({ element, elements })

    this.createObserver()
  }

  createObserver () {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!this.isVisible && entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.observer.observe(this.element)
  }

  animateIn () {
    this.isVisible = true
  }

  animateOut () {
    this.isVisible = false
  }
}
