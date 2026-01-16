<template>
  <hr>
  <h2>原数据：{{user}}</h2>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age+=1">修改年龄</button>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
    name:'Demo2',
    setup(){
        let user = reactive({
            name:'Jona than',
            age:18
        })

        return {
            user,
            ...toRefs(user)
        }
    }
}
</script>

<style>

</style>