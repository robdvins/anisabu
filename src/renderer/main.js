import Vue from 'vue'
import App from './App.vue'
import store from './store'

import BaseButton from '@/renderer/components/BaseButton.vue'

Vue.component('BaseButton', BaseButton)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
