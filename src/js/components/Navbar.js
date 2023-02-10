import Component from '../classes/Component'
import { gsap, Sine } from 'gsap'
import { mapEach } from '../utils/dom'
import Link from './Link'

export default class Navbar extends Component {
  constructor () {
    super({
      element: '.navbar',
      elements: {
        themeSwitchers: document.querySelectorAll('.navbar__color_options__option__text'),
        toggler: '.navbar__menu_toggler',
        ball: '.preloader__ball',
        openedNav: '.navbar--open',
        closer: '.navbar__articles',
        animationLinks: document.querySelectorAll('nav [data-animation="link"]')
      }
    })
  }

  create () {
    super.create()

    this.createAnimations()

    this.setTheme()
    this.changeTheme()

    gsap.set(this.elements.openedNav, { autoAlpha: 0 })

    this.timeline = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: Sine.easeInOut } })
    this.timeline
      .to(this.element, { y: '-100%', autoAlpha: 0 })
      .to('.content', { y: '15%', autoAlpha: 0 }, '<')
      .to('body', { overflow: 'hidden' }, '<')
      .to(this.elements.ball, { right: '-6.1428571429r1em', duration: 1 }, '<')
      .to(this.elements.ball.querySelectorAll('img'), { width: '77rem', duration: 1 }, '<')
      .to(this.elements.openedNav, { autoAlpha: 1 }, '<50%')
  }

  createAnimations () {
    mapEach(this.elements.animationLinks, element => {
      return new Link({
        element
      })
    })
  }

  changeTheme () {
    const activeTheme = window.localStorage.getItem('theme')

    document.documentElement.className = activeTheme

    this.elements.themeSwitchers.forEach(theme => {
      if (window.localStorage.getItem('theme') === theme.id) {
        theme.classList.add('active')
      } else {
        theme.classList.remove('active')
      }
    })
  }

  setTheme () {
    this.elements.themeSwitchers.forEach(theme => {
      theme.addEventListener('click', () => {
        window.localStorage.setItem('theme', theme.id)
        this.changeTheme()
      })
    })
  }

  open () {
    this.timeline.play()
  }

  close () {
    this.timeline.reverse()
  }

  addEventListeners () {
    this.onOpenEvent = this.open.bind(this)
    this.onCloseEvent = this.close.bind(this)

    this.elements.toggler.addEventListener('click', this.onOpenEvent)
    this.elements.closer.addEventListener('click', this.onCloseEvent)
  }

  removeEventListeners () {
  }
}
