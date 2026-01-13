export default {
    namespaced:true,
    state:{
        isCollapse:false
    },
    actions:{

    },
    getters:{

    },
    mutations:{
        updateCollapse(state){
            state.isCollapse = !state.isCollapse
        }
    }
}