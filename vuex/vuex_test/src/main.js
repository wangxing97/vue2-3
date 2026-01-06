import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

console.log("冲突");
window.vm =  new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
}).$mount('#app')

//Vue.prototype.$bus = window.vm
