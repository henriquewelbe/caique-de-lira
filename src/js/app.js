import '../scss/style.scss'

import each from 'lodash/each'

import Homepage from './pages/Homepage'
import About from './pages/About'

import Preloader from './components/Preloader'
import Scroll from './components/Scroll'

class App {
  constructor () {
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    this.createPreloader()
    this.createScroll()
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
    this.page.show()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', () => {
      this.preloader.destroy()
    })
  }

  createScroll () {
    this.scroll = new Scroll()
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

      this.page = this.pages[this.template]

      this.page.create()
      this.page.show()
      this.addLinkListeners()
    }
  }

  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.parentElement.parentElement.classList.add('teste')
      link.onclick = event => {
        event.preventDefault()

        const href = event.target.href
        this.onChange(href)
      }
    })
  }
}

new App()
