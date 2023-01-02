import { focusTrackLeave } from '~~/directives/focus-track-leave'
import { focus } from '~~/directives/focus'
import { masonry } from '~~/directives/masonry'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus-track-leave', focusTrackLeave)
  nuxtApp.vueApp.directive('focus', focus)
  nuxtApp.vueApp.directive('masonry', masonry)
})
