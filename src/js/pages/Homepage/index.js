import Page from '../../classes/Page'

export default class Homepage extends Page {
  constructor () {
    super({
      id: 'homepage',
      element: '.homepage',
      elements: {
        navbar: '.navbar'
      }
    })
  }

  create () {
    super.create()
  }
}
