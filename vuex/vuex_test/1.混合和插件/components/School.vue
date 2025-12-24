<template>
  <div class="school">
    <h2 @click="showName(sname)">学校名称：{{sname}}</h2>
    <h2 @click="printClg">学校地址：{{address}}</h2>
    <Student :lists="lists" ref="student"/>
  </div>
</template>

<script>
import Student from './Student.vue'
import {fm1,fm2} from '../mixin'
export default {
    name:'School',
    components:{
        Student
    },
    data(){
        return {
            sname:"北京大学",
            address:"北京市海淀区",
            lists:[
                {name:'张三',age:18},
                {name:'李四',age:19},
                {name:'王五',age:20},
            ]
        }
    },
    mixins:[fm1,fm2]
}
</script>

<style>
.school{
    background-color: gray;
}
</style>