export default{
    namespaced: true,
    state : {
        n : 2
    },
    mutations : {
        changeStep(state, {n}){
            state.n = n;
        }
    },
    actions: {
        changeStep({commit}, {n}){
            commit("changeStep",{n})
        }
    }
}