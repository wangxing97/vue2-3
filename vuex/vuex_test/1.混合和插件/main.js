import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import {fm3} from './mixin'
import plugins from './plugin'
Vue.mixin(fm3)
Vue.use(plugins)

window.vm =  new Vue({
  render: h => h(App),
}).$mount('#app')
