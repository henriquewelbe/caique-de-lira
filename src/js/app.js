import '../scss/style.scss'

import each from 'lodash/each'

import Homepage from './pages/Homepage'
import About from './pages/About'

import Preloader from './components/Preloader'
import Scroll from './components/Scroll'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'

import viewport from './utils/viewport'

class App {
  constructor () {
    this.createNavbar()
    this.createCursor()
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    this.addEventListeners()
    this.createPreloader()
    this.createScroll()
    this.calculateViewportHeight()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createCursor () {
    this.cursor = new Cursor()

    window.cursor = this.cursor
  }

  createPages () {
    this.pages = {
      homepage: new Homepage(),
      about: new About()
    }

    this.page = this.pages[this.template]

    this.page.create()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', () => {
      this.page.show()
    })

    window.preloader = this.preloader
  }

  createScroll () {
    this.scroll = new Scroll()
  }

  createNavbar () {
    this.navbar = new Navbar()

    window.navbar = this.navbar
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange ({ url, push = true }) {
    await this.page.hide()
    const request = await window.fetch(url)

    if (request.status === 200) {
      const nextPageHtml = await request.text()

      if (push) {
        window.history.pushState({}, '', url)
      }

      const fakeDiv = document.createElement('div')
      fakeDiv.innerHTML = nextPageHtml

      const content = fakeDiv.querySelector('.content')

      this.template = content.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = content.innerHTML

      this.page = this.pages[this.template]

      this.page.create()
      this.page.show()

      this.navbar.setTheme()

      this.cursor.addEventListeners()

      this.addLinkListeners()
    }
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        if (event.target.target !== '_blank') {
          event.preventDefault()

          const { href } = event.target

          this.onChange({ url: href })
        }
      }
    })
  }

  addEventListeners () {
    window.addEventListener('popstate', this.onPopState.bind(this))
  }

  calculateViewportHeight () {
    document.documentElement.style.setProperty('--vh', viewport.height / 100 + 'px')

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', viewport.height / 100 + 'px')
    })
  }
}

window.app = new App()
