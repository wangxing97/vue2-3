<template>
  <div class="container">
    <h2>Search Github Users</h2>
    <input type="text" v-model="userKey">
    <button @click="searchUsers">Search</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Search',
    data(){
        return {
            userKey:''
        }
    },
    methods:{
        searchUsers(){
            this.$bus.$emit('updateList',[],{isFirst:false,isLoaded:true});
            axios.get(`https://api.github.com/search/users?q=${this.userKey}`).then(
                response => {
                    this.$bus.$emit('updateList',response.data.items,{isFirst:false,isLoaded:false});
                },
                error => {
                    this.$bus.$emit('updateList',[],{isFirst:false,isLoaded:false,errorMsg:error.message});
                }
            );
        }
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100px;
    background-color: gray;
    padding: 10px;
    margin-bottom: 10px;
}
</style>