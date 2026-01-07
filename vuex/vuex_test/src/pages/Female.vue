<template>
  <div>
    <h3>女性人数：{{ $route.params.number }}</h3>
    <button @click="goUser">回到User</button>
    <input type="text"/>
  </div>
</template>

<script>
export default {
  name:"Nvxing",
  methods:{
    goUser(){
      this.$router.replace("/User")
    }
  }
}
</script>

<style>

</style>