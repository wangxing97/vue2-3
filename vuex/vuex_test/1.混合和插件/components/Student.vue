<template>
  <div class="school">
    <ul>
        <li v-for="(item,index) in lists" :key="index" @click="showName(item.name)">
            {{item.name}} -- {{item.age}}
        </li>
    </ul>
    <button @click="printClg">printClg</button>
    <button @click="sayHello">sayHello</button>
  </div>
</template>

<script>
  import {fm1,fm2} from '../mixin'
  export default {
      name:'Student',
      props:['lists'],
      data(){
          return {
          }
      },
      methods:{
        sayHello(){
          this.hello();
        }
      },
      mixins:[fm1,fm2]
  }
</script>

<style>

</style>