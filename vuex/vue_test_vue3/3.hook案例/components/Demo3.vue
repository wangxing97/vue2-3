<template>
  <hr>
  <input type="text" v-model="keyword">
  <h2>{{keyword}}</h2>
  <h2>父组件：{{car}}</h2>
</template>

<script>
import { customRef, inject } from 'vue';

export default {
    name:'Demo3',
    setup(){
        const car = inject('car')
        function myRef(value,delay){
            let timer
            return customRef((track,trigger)=>{
                return {
                    get(){
                        track()
                        return value
                    },
                    set(newVal){
                        clearTimeout(timer)
                        timer = setTimeout(() => {
                            value = newVal
                            trigger()
                        }, delay)
                    }
                }
            })
        }
        let keyword = myRef('hello',1000)
        return {
            keyword,
            car
        }
    }
}
</script>

<style>

</style>