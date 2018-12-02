import axios from 'axios';
import querystring from 'querystring'

export default{
    namespaced: true,
    state : {
        "results" : [],
        "sortby" : "id",
        "sortdirection" : 1,
        "page" : 2,
        "pagesize" : 10,
        "total" : 0,
        "filters" : [
            //{k : "color", v : "白v黑v蓝"},
            //{k : 'fuel', v : '汽油v柴油'},
            //{k : "exhaust", v : "国一v国二v国三"},
            //{k : "price", v : "11to20"},
            //{k : "km", v : "960000to1000000"},
            //{k : "buydate", v : "1510099200000to1514592000000"},
            
        ]
    },
    mutations: {
        changeResults(state, {results}){
            state.results = results;
        },
        changeSort(state, {sortby, sortdirection}){
            state.sortby = sortby;
            state.sortdirection = sortdirection;
        },
        changeTotal(state, {total}){
            state.total = total;
        },
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        addFilters(state, {k, v}){
            state.filters.push({k,v});
        },
        updateFilters(state, {k, v}){
            state.filters = state.filters.map(item => item.k == k ? {...item, v} : item);
        },
        delFilters(state, {k}){
            state.filters = state.filters.filter(item => item.k != k);
        }
    },
    actions : {
        async getcars({commit, state}){
            const {sortby, sortdirection, page, pagesize, filters} = state;
            var filtersobj = {};
            for(let i = 0; i < state.filters.length; i++){
                filtersobj[filters[i].k] = filters[i].v;
            }
            const {results, total} = await axios.get("/api/findcar/?"+ querystring.stringify({
                sortby,
                sortdirection,
                page,
                pagesize,
                ...filtersobj
            })).then(data => data.data);
            commit("changeResults",{results});
            commit("changeTotal",{total});
        },
        changeSort({commit, dispatch}, {key, order}){
            commit("changeSort",{"sortby" :key, "sortdirection":order == "asc" ? 1 : -1});
            dispatch("getcars");
        },
        changePage({commit, dispatch},{page}){
            commit("changePage", {page});
            dispatch("getcars");
        },
        changePagesize({commit,dispatch},{pagesize}){
            commit("changePagesize", {pagesize});
            commit("changePage", {"page" : 1});
            dispatch("getcars");
        },
        changeFilters({commit, dispatch, state}, {k,v}){
            var isExist = false;
            state.filters.forEach(item => {
                if(item.k == k){
                    isExist = true;
                }
            });
            if(isExist){
                if(v == ""){
                    commit("delFilters", {k});
                }else{
                    commit("updateFilters", {k, v});
                }
            }else{
                commit("addFilters", {k, v});
            }
            commit("changePage", {"page" : 1});
            dispatch("getcars");
        },
    }
}
