import handlebars from 'vite-plugin-handlebars'
import path from 'path'
import { defineConfig } from 'vite'
import { ifCond } from './src/handlebars/helpers'
import { fileURLToPath, URL } from 'url'

export default () => {
  // automatizar pra pegar todas as páginas do /pages
  const pageData = {
    '/index.html': {},
    '/about/index.html': {}
  }

  return defineConfig({
    root: './views/pages',
    publicDir: '../../public',

    server: {
      port: 3000,
      open: true
    },

    build: {
      outDir: '../../dist',
      assetsDir: './',
      copyPublicDir: true
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/jsapp', import.meta.url))
      }
    },

    rollupInputOptions: {
      // input: path.resolve(__dirname, 'src/js/app.js')
      input: pageData
    },

    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'views/partials'),

        helpers: {
          ifCond
        },

        // implementar DynamicRouter
        context (pagePath) {
          return pageData[pagePath]
        }
      })
    ],

    appType: 'mpa'
  })
}
