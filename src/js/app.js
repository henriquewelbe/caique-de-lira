import '../scss/style.scss'

import each from 'lodash/each'

import Homepage from './pages/Homepage'
import About from './pages/About'

import Preloader from './components/Preloader'
import Scroll from './components/Scroll'
import Navbar from './components/Navbar'

import viewport from './utils/viewport'

class App {
  constructor () {
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    this.createPreloader()
    this.createScroll()
    this.calculateViewportHeight()
    this.createNavbar()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
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
  }

  createScroll () {
    this.scroll = new Scroll()
  }

  createNavbar () {
    this.navbar = new Navbar()
  }

  async onChange (url) {
    await this.page.hide()
    const request = await window.fetch(url)

    if (request.status === 200) {
      const nextPageHtml = await request.text()

      const fakeDiv = document.createElement('div')
      fakeDiv.innerHTML = nextPageHtml

      const content = fakeDiv.querySelector('.content')

      this.template = content.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = content.innerHTML

      // mudar o pathname sem recarregar a página
      // window.location.pathname = this.template !== 'homepage' ? this.template + '/' : ''

      this.page = this.pages[this.template]

      this.page.create()
      this.page.show()

      this.navbar.setTheme()

      this.addLinkListeners()
    }
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        event.preventDefault()

        const { href } = event.target

        this.onChange(href)
      }
    })
  }

  calculateViewportHeight () {
    document.documentElement.style.setProperty('--vh', viewport.height / 100 + 'px')

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', viewport.height / 100 + 'px')
    })
  }
}

window.app = new App()
