import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My Notes',
      meta: [
        { name: 'description', content: 'Type the text you hear or see.' }
      ]
    }
  },
  css: ['assets/styles/main.css'],
  imports: { dirs: ['./store'] },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'skipHydrate'] }],
    '@vueuse/nuxt'
  ],
  vite: {
    // https://github.com/nuxt/framework/issues/7794
    devBundler: 'legacy',
    plugins: [
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'assets/icons')],
        symbolId: 'icon-[name]',
        customDomId: 'svg-sprite'
      })
    ]
  }
})
