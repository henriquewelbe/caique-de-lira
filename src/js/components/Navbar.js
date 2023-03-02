import Component from '../classes/Component'
import { gsap, Sine } from 'gsap'
import { mapEach } from '../utils/dom'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import Link from './Link'

gsap.registerPlugin(MorphSVGPlugin)

export default class Navbar extends Component {
  preloader = window.preloader

  constructor () {
    super({
      element: '.navbar',
      elements: {
        wrapper: '.navbar__wrapper',
        themeSwitchers: document.querySelectorAll('.navbar__color_options__option__text'),
        toggler: '.navbar__menu_toggler',
        ball: '.preloader__ball img',
        ballWrapper: '.preloader__ball',
        openedNav: '.navbar--open',
        closer: '.toggle__icon',
        articles: '.navbar__small_links',
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
  }

  createAnimations () {
    mapEach(this.elements.animationLinks, element => { return new Link({ element }) })
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
    this.elements.closer.classList.add('open')

    gsap.killTweensOf(this.elements.ballWrapper)
    gsap.killTweensOf(this.elements.ball)

    gsap.to(this.element.querySelectorAll('.navbar__wrapper >:not(.navbar__menu_toggler)'), { y: '-100%', autoAlpha: 0, duration: 0.4, ease: Sine.easeInOut })
    gsap.to(this.elements.toggler, { autoAlpha: 0, duration: 0.4, ease: Sine.easeInOut })
    gsap.to('.content', { y: '15%', autoAlpha: 0, duration: 0.4, ease: Sine.easeInOut })
    gsap.to('body', { overflow: 'hidden', duration: 0.4, ease: Sine.easeInOut })
    gsap.to(this.elements.ballWrapper, { inset: 'auto 6rem auto auto', y: '0%', x: '0%', duration: 1, ease: Sine.easeInOut })
    gsap.to(this.elements.ball, { width: '60rem', duration: 1, ease: Sine.easeInOut })
    gsap.to(this.elements.openedNav, { autoAlpha: 1, duration: 0.4, ease: Sine.easeInOut, delay: 0.2 })
  }

  close () {
    this.elements.closer.classList.remove('open')

    gsap.to(this.elements.openedNav, { autoAlpha: 0, duration: 0.4, ease: Sine.easeInOut })

    setTimeout(() => {
      this.emit('closed')

      gsap.to(this.element.querySelectorAll('.navbar__wrapper >:not(.navbar__menu_toggler)'), { y: '0%', autoAlpha: 1, duration: 0.4, ease: Sine.easeInOut })
      gsap.to(this.elements.toggler, { autoAlpha: 1, duration: 0.4, ease: Sine.easeInOut })
      gsap.to('.content', { y: '0%', autoAlpha: 1, duration: 0.4, ease: Sine.easeInOut })
      gsap.to('body', { overflow: 'unset', duration: 0.4, ease: Sine.easeInOut })
    }, 200)
  }

  hoverArticles () {
    gsap.to('#unhovered-nav path', { morphSVG: '#hovered-nav path' })
  }

  hoverOutArticles () {
    gsap.to('#hovered-nav path', { morphSVG: '#unhovered-nav path' })
  }

  addEventListeners () {
    this.onOpenEvent = this.open.bind(this)
    this.onCloseEvent = this.close.bind(this)
    this.onHoverArticlesEvent = this.hoverArticles.bind(this)
    this.onUnhoverArticlesEvent = this.hoverArticles.bind(this)

    this.elements.toggler.addEventListener('click', this.onOpenEvent)
    this.elements.closer.addEventListener('click', this.onCloseEvent)
    this.elements.articles.addEventListener('mouseenter', this.onHoverArticlesEvent)
    this.elements.articles.addEventListener('mouseleave', this.onUnhoverArticlesEvent)
  }

  removeEventListeners () {
  }
}
