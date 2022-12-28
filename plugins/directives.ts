import { focusout } from '~~/directives/focusout'
import { masonry } from '~~/directives/masonry'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focusout', focusout)
  nuxtApp.vueApp.directive('masonry', masonry)
})
