import Vue from 'vue'
import App from './App.vue'
import store from './store'
Vue.config.productionTip = false

console.log("冲突");
window.vm =  new Vue({
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
}).$mount('#app')

//Vue.prototype.$bus = window.vm
