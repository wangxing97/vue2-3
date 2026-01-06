<template>
    <div class="container">
        <h2 v-show="pageState.isFirst">This is initial page...</h2>
        <h2 v-show="pageState.isLoaded">Data Loaded...</h2>
        <h2 v-show="pageState.errorMsg">Occurs error：{{pageState.errorMsg}}</h2>
        <div class="user-item" 
             v-for="(item) in userList" 
             :key="item.login"
             v-show="userList.length > 0">
            <img :src="item.avatar_url" :alt="item.node_id"> 
            <p>{{item.login}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'List',
    mounted(){
        this.$bus.$on('updateList',(userList,pageState)=>{
            this.userList = userList;
            this.pageState = {...this.pageState,...pageState};
        });
    },
    data(){
        return {
            userList:[],
            pageState:{
                isFirst:true,
                isLoaded:false,
                errorMsg:''
            }
        }
    }
}
</script>

<style scoped>
.container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 自动排多列，每列最小150px */
    gap: 1px; /* 项之间的间距 */
}
.user-item {
    text-align: center; /* 头像+用户名居中 */
    border: 1px solid gray;
    width: 300px;
    height: 200px;
}
.user-item img {
    width: 150px; /* 头像大小，可调整 */
    height: 150px;
    border-radius: 4px; /* 可选：圆角头像 */
    object-fit: cover;
}
.user-item p {
    margin: 5px 0 0 0;
    font-size: 14px;
}
</style>