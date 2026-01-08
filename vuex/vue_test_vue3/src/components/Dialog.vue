<template>
  <hr>
  <button @click="isShow=true">点我弹框</button>
  <teleport to='body'>
    <div v-if="isShow" class="mask">
        <div class="dialog">
            <h3>Something...</h3>
            <h3>Something...</h3>
            <h3>Something...</h3>
            <button @click="isShow=false">点我关闭</button>
        </div>
    </div>
  </teleport>
</template>

<script>
import { ref } from 'vue';

export default {
    name:'Dialog',
    setup(){
        let isShow = ref(false)
        return {
            isShow
        }
    }
}
</script>

<style>
.mask{
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.dialog{
  --width:300px;
  width: var(--width);
  height: var(--width);
  background-color: green;
  text-align: center;
  position: absolute;
  top: calc(50% - var(--width) / 2);
  left: calc(50% - var(--width) / 2);
}
</style>