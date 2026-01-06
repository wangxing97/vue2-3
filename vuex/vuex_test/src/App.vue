<template>
  <div id="app">
    <router-link active-class="activeClass" to="/Home" >Home</router-link>
    <router-link active-class="activeClass" to="/User" >User</router-link>
    <router-view style="margin-left: 50px;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>
.activeClass{
  color: red;
}
</style>
