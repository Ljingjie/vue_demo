export default{
    namespaced: true,
    state : {
        cars : [{"id":1000014}]
    },
    mutations : {
        addcar(state, {carinfo}){
            state.cars.push(carinfo);
        },
        delcar(state, {id}){
            state.cars = state.cars.filter(item => item.id != id);
        },
    },
    actions : {
        addcar({commit},{carinfo}){
            commit("addcar",{carinfo});
        },
        delcar({commit},{id}){
            commit("delcar",{id});
        }
    }
}