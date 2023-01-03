import { trackFocusleave } from '~~/directives/track-focusleave'
import { focus } from '~~/directives/focus'
import { masonry } from '~~/directives/masonry'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('track-focusleave', trackFocusleave)
  nuxtApp.vueApp.directive('focus', focus)
  nuxtApp.vueApp.directive('masonry', masonry)
})
