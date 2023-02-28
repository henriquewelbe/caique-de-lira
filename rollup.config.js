import { getHomepage } from './src/graphql'

export default async () => {
  const homepage = await getHomepage()

  // automatizar pra pegar todas as páginas do /pages
  const pageData = {
    '/index.html': {
      homepage: {
        title: homepage.title
      }
    },
    '/about/index.html': {}
  }

  return {
    input: pageData
  }
}
