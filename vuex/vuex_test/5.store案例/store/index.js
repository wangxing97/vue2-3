import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const countOptions = {
    namespaced:true,
    state:{
        sum:0
    },
    actions:{
        addByAction(context,n){
            return context.commit("addByMutation",n)
        },
        subByAction(context,n){
            return context.commit("subByMutation",n)
        }
    },
    getters:{
        sum(state){
            return state.sum * 10
        }
    },
    mutations:{
        addByMutation(state,n){
            state.sum += n
        },
        subByMutation(state,n){
            if(state.sum <= 0) n = 0
            state.sum -= n
        },
        oddByMutation:(state,n)=>{
            if(state.sum % 2 === 1){
                state.sum += n
            }
        },
        waitByMutation:(state,n)=>{
            setTimeout(() => {
                state.sum += n
            }, 2000);
        }
    }
}
export default new Vuex.Store({
    modules:{
        countOptions
    }
})