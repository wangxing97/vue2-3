<template>
  <div>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="addAge">添加年龄</button>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';


export default {
  name: 'App',
  setup(){
    let name = ref('张三')
    let age = ref(18)
    let addAge = function(){
      age.value += 1
    }
    let zxc = ref({
      a:1,
      b:{
        c:2
      }
    })
    let qwe = reactive({
      a:6,
      c:'zx'
    })
    console.log(name);
    console.log(zxc);
    console.log(qwe);
    console.log(addAge);
    return {
      name,
      age,
      addAge
    }
  }
}
</script>

<style>
</style>
