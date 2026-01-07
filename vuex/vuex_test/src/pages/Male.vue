<template>
  <div>
    <h3>男性人数：{{ number }} --- {{ $route.query.a }}</h3>
    <button @click="goHome">回到Home</button>
    <input type="text"/>
  </div>
</template>

<script>
export default {
  name:"Nanxing",
  props:['number'],
  methods:{
    goHome(){
      this.$router.push("/Home")
    }
  },
  beforeRouteEnter(to,from,next){
    console.log('route before enter',to,from);
    next();
  },
  beforeRouteLeave(to,from,next){
    console.log('route before leave',to,from);
    next();
  }
}
</script>

<style>

</style>