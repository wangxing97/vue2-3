<template>
    <span>姓:</span>
    <input type="text" v-model="person.firstName">
    <br>
    <span>名:</span>
    <input type="text" v-model="person.lastName">
    <br>
    <span>全名：{{person.fullName}}</span>
    <br>
    全名：
    <input type="text" v-model="person.fullName">
</template>

<script>
import { ref,computed, reactive, watch, watchEffect } from 'vue';

export default {
    name:'User',
    beforeCreate(){
    },
    setup(props,context){
        let person = reactive({
            firstName:'张',
            lastName:'三'
        })
        // person.fullName = computed(()=>{
        //     return person.firstName + '-' + person.lastName
        // })
        person.fullName = computed({
            get(){
                return person.firstName + '-' + person.lastName
            },
            set(value){
                const arr = value.split('-')
                person.firstName = arr[0]
                person.lastName = arr[1]
            }
        })
        watch([()=>person.firstName,()=>person.lastName],(newVal,oldVal)=>{
            console.log('---newVal:',newVal,'----oldVal:',oldVal);
        },{immediate:true,deep:true})
        watchEffect((...params)=>{
            const x = person.firstName;
            const y = person.lastName;
            console.log('---watchEffect:',params);
        })
        return {
            person
        }
    }
}
</script>

<style>

</style>