<template>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <slot name="zxc"></slot>
  <slot name="abc"></slot>
  <br>
  <button @click="nihao">hello</button>
</template>

<script>
import { ref } from 'vue';

export default {
    name:'User',
    props:['gender','weather'],
    emits:['hello'],
    beforeCreate(){
        console.log('------User组件beforeCreate------');
    },
    setup(props,context){
        console.log('------User组件setup------');
        console.log('------User组件props：' ,props);
        console.log('------User组件context.attrs：' ,context.attrs);
        console.log('------User组件context.emit' ,context.emit);
        console.log('------User组件context.slots' ,context.slots);
        let name = ref('Jerry');
        let age = ref(18);
        function nihao(){
            context.emit('hello',666)
        }
        return {
            name,
            age,
            nihao
        }
    }
}
</script>

<style>

</style>