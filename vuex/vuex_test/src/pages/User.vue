<template>
  <div>
    <h2>User Page</h2>
    <ul>
        <li><router-link active-class="activeClass" :to="{ name:'nande',params:{ number:3 },query:{ a:'zxc' } }" >Male</router-link></li>
        <li><router-link replace active-class="activeClass" to="/User/Female/5" >Female</router-link></li>
    </ul>
    <router-view style="margin-left: 100px;"></router-view>
  </div>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.activeClass{
  color:burlywood;
}
</style>