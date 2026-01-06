<template>
    <div>
        <!-- <h2>当前求和为:{{$store.state.sum}}</h2>
        <h2>扩大十倍和:{{$store.getters.sum}}</h2>
        <select v-model="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">当前求和为奇数再加</button>
        <button @click="incrementWait">等一等再加</button> -->
        <h2>当前求和为:{{sum}}</h2>
        <h2>扩大十倍和:{{bigSum}}</h2>
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment(n)">+</button>
        <button @click="decrement(n)">-</button>
        <button @click="incrementOdd(n)">当前求和为奇数再加</button>
        <button @click="incrementWait(n)">等一等再加</button>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
    name:"Count",
    data(){
        return {
            n:1
        }
    },
    computed:{
        ...mapState('countOptions',['sum']),
        ...mapGetters('countOptions',{bigSum:'sum'})
    },
    methods:{
        // increment(){
        //     this.$store.dispatch("addByAction",this.n)
        // },
        // decrement(){
        //     this.$store.dispatch("subByAction",this.n)
        // },
        // incrementOdd(){
        //     this.$store.commit("oddByMutation",this.n)
        // },
        // incrementWait(){
        //     this.$store.commit("waitByMutation",this.n)
        // }
        ...mapActions('countOptions',{increment:'addByAction',decrement:'subByAction'}),
        ...mapMutations('countOptions',{incrementOdd:'oddByMutation',incrementWait:'waitByMutation'})
    }
}
</script>

<style>

</style>