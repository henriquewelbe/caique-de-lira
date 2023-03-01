import handlebars from 'vite-plugin-handlebars'
import path from 'path'
import { defineConfig } from 'vite'
import { ifCond } from './src/handlebars/helpers'
import { fileURLToPath, URL } from 'url'
import getPagesData from './rollup.config.js'

export default () => {
  return defineConfig({
    root: './views/pages',
    publicDir: '../../public',
    appType: 'mpa',

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
      input: getPagesData().then(data => data.input)
    },

    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'views/partials'),

        helpers: {
          ifCond
        },

        // implementar DynamicRouter
        context (pagePath) {
          return getPagesData().then(data => data.input[pagePath])
        }
      })
    ]
  })
}
