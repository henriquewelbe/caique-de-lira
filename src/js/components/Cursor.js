import Component from '../classes/Component'

export default class Cursor extends Component {
  constructor (lerp = 0.2) {
    super({ element: '#cursor' })

    this.cursorInfos = {
      x: 0,
      y: 0,
      el: this.element
    }

    this.lerp = lerp
    this.mouseX = 0
    this.mouseY = 0

    document.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX
      this.mouseY = event.clientY

      this.point = {
        x: this.mouseX,
        y: this.mouseY
      }
    })

    this.tick()
  }

  tick = () => {
    if (this.point) {
      this.distanceX = this.point.x - this.cursorInfos.x
      this.distanceY = this.point.y - this.cursorInfos.y
      this.cursorInfos.x += this.distanceX * this.lerp
      this.cursorInfos.y += this.distanceY * this.lerp
      this.cursorInfos.el.style.transform = `translate(calc(${this.cursorInfos.x}px - 50%), calc(${this.cursorInfos.y}px - 50%))`
    }

    window.requestAnimationFrame(this.tick)
  }

  createState ({ listenerIn = 'mouseenter', listenerOut = 'mouseleave', element, className }) {
    document.querySelectorAll(element).forEach((element) => {
      element.addEventListener(listenerIn, () => {
        this.element.classList.add(className)
      })

      element.addEventListener(listenerOut, () => {
        this.element.classList.remove(className)
      })
    })
  }

  addEventListeners () {
    this.linkElements = ['a', 'button']

    this.linkElements.forEach((element) => {
      this.createState({ element, className: 'cursor--hover_link' })
    })
  }

  removeEventListeners () {
  }
}
