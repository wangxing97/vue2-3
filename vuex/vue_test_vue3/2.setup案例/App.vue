<template>
  <User gender="Male" weather="Cloud" zxc="test1" @hello="sayHello">
    <template v-slot:abc>
      <span>abc</span>
    </template>
    <template v-slot:zxc>
      <span>zxc</span>
    </template>
  </User>
</template>

<script>
  import User from './components/User.vue'
export default {
  name: 'App',
  components:{User},
  setup(){
    function sayHello(value){
      alert(`Hello World!!${value}`)
    }
    return {
      sayHello
    }
  }
}
</script>

<style>
</style>
