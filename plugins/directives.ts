import { vFocusout } from '~~/directives/vFocusout'
import { vMasonry } from '~~/directives/vMasonry'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focusout', vFocusout)
  nuxtApp.vueApp.directive('masonry', vMasonry)
})
