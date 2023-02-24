import Component from '../classes/Component'
import { gsap, Sine } from 'gsap'
import { mapEach } from '../utils/dom'
// import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import Link from './Link'

// gsap.registerPlugin(MorphSVGPlugin)

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
        articles: '.navbar__articles__background',
        animationLinks: document.querySelectorAll('nav [data-animation="link"]')
      }
    })
  }

  create () {
    super.create()

    this.createAnimations()

    this.setTheme()
    this.changeTheme()

    // Open navbar animation
    this.preloader = window.preloader
    gsap.set(this.elements.openedNav, { autoAlpha: 0 })

    this.openNav = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: Sine.easeInOut } })
    // this.openNav
    //   .to(this.element.querySelectorAll('.navbar__wrapper >:not(.navbar__menu_toggler)'), { y: '-100%', autoAlpha: 0 })
    //   .to(this.elements.toggler, { autoAlpha: 0 }, '<')
    //   .to('.content', { y: '15%', autoAlpha: 0 }, '<')
    //   .to('body', { overflow: 'hidden' }, '<')
    //   .to(this.elements.ballWrapper, { right: '6rem', y: '0%', bottom: '0%', duration: 1 }, '<')
    //   .to(this.elements.ball, { width: '60rem', duration: 1 }, '<')
    //   .to(this.elements.openedNav, { autoAlpha: 1 }, '<50%')

    // Articles hover animation
    // this.articlesHover = gsap.timeline({ paused: true })
    // this.articlesHover
    // .to(this.elements.articles.querySelector('path'), { morphSVG:  })
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
    this.openNav.play()

    // this.openNav
    //   .to(this.element, { y: '-100%', autoAlpha: 0 })
    //   .to('.content', { y: '15%', autoAlpha: 0 }, '<')
    //   .to('body', { overflow: 'hidden' }, '<')
    //   .to(this.elements.ballWrapper, { right: '6rem', y: '0%', bottom: '0%', duration: 1 }, '<')
    //   .to(this.elements.ball, { width: '60rem', duration: 1 }, '<')
    //   .to(this.elements.openedNav, { autoAlpha: 1 }, '<50%')
    this.elements.closer.classList.add('open')

    gsap.to(this.elements.wrapper, { y: '-100%', autoAlpha: 0, duration: 0.4 })
    gsap.to('.content', { y: '15%', autoAlpha: 0, duration: 0.4 })
    gsap.to('body', { overflow: 'hidden', duration: 0.4 })
    gsap.to(this.elements.ballWrapper, { right: '6rem', y: '50%', duration: 1 })
    gsap.to(this.elements.ball, { width: '60rem', duration: 1 })
    gsap.to(this.elements.openedNav, { autoAlpha: 1, delay: 0.5, duration: 0.4 })
  }

  close ({ top, bottom, left, right, x, y, width }) {
    this.openNav.reverse()
    this.elements.closer.classList.remove('open')

    gsap.to(this.elements.wrapper, { y: '0%', autoAlpha: 1, duration: 0.4 })
    gsap.to('.content', { y: '0%', autoAlpha: 1, duration: 0.4 })
    gsap.to('body', { overflow: 'unset', duration: 0.4 })
    // gsap.to(this.elements.ballWrapper, { top, bottom, left, right, x, y, duration: 1 })
    gsap.to(this.elements.ballWrapper, { right: '50%', x: '50%' })
    // gsap.to(this.elements.ball, { width, duration: 1 })
    gsap.to(this.elements.ball, { width: '31.25rem', duration: 1 })
    gsap.to(this.elements.openedNav, { autoAlpha: 0, duration: 0.4 })
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
