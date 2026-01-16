<template>
  <button @click="unmountDemo">切换Demo</button>
  <br>
  <Suspense>
    <template v-slot:default>
      <User/>
    </template>
    <template v-slot:fallback>
      <h3>加载中。。。</h3>
    </template>
  </Suspense>
  <Demo v-if="isShow"></Demo>
  <Demo2/>
  <Demo3/>
  <Dialog/>
</template>

<script>
// import User from './components/User.vue'
import { defineAsyncComponent } from 'vue'
const User = defineAsyncComponent(()=>import('./components/User'))
import Demo from './components/Demo.vue'
import Demo2 from './components/Demo2.vue'
import Demo3 from './components/Demo3.vue'
import Dialog from './components/Dialog.vue'
import { provide, reactive, ref } from 'vue';
export default {
  name: 'App',
  components:{User,Demo,Demo2,Demo3,Dialog},
  setup(){
    let isShow = ref(true)
    function unmountDemo(){
      isShow.value = !isShow.value
    }
    let car = reactive({
      name:'Audi',
      price:'35w'
    })
    provide('car',car)
    return {
      isShow,
      unmountDemo
    }
  }
}
</script>

<style>
</style>
