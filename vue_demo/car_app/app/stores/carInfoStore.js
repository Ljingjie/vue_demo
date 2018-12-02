import axios from 'axios'

export default{
    namespaced: true,
    state : {
        carinfo : [],
        album : "view",
        idx : 0
    },
    mutations: {
        changeCarInfo(state, {carinfo}){
            state.carinfo = carinfo;
        },
        changeAlbum(state, {album}){
            state.album = album;
        },
        changeIdx(state, {idx}){
            state.idx = idx;
        }
    },
    actions : {
        async loadSever({commit}, {id}){
            const {result} = await axios.get("/api/carinfo?id="+id).then(data => data.data);
            commit("changeCarInfo", {"carinfo" : result})
        },
        changeAlbum({commit}, {album}){
            commit("changeAlbum", {album});
            commit("changeIdx",{"idx" : 0});
        },
        goPre({commit,state}){
            if(state.idx > 0){
                commit("changeIdx",{"idx" : state.idx-1});
            }else{
                if(state.album == "view"){
                    commit("changeAlbum", {"album" : "more"});
                }else if(state.album == "more"){
                    commit("changeAlbum", {"album" : "engine"});
                }else if(state.album == "engine"){
                    commit("changeAlbum", {"album" : "inner"});
                }else if(state.album == "inner"){
                    commit("changeAlbum", {"album" : "view"});
                }
                commit("changeIdx",{"idx" : state.carinfo.images[state.album].length - 1});
            }
        },
        goNext({commit,state}){
            if(state.idx < state.carinfo.images[state.album].length - 1){
                commit("changeIdx",{"idx" : state.idx+1});
            }else{
                commit("changeIdx",{"idx" : 0});
                if(state.album == "view"){
                    commit("changeAlbum", {"album" : "inner"});
                }else if(state.album == "inner"){
                    commit("changeAlbum", {"album" : "engine"});
                }else if(state.album == "engine"){
                    commit("changeAlbum", {"album" : "more"});
                }else if(state.album == "more"){
                    commit("changeAlbum", {"album" : "view"});
                }
            }
        }
    }
}