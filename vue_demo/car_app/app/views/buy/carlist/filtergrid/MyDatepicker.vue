<template>
   <div>
        <DatePicker type="daterange" placeholder="Select date" 
        :value="v" @on-change="change" :clearable="false">        
        </DatePicker>
   </div>
</template>

<script>
export default {
    props : ["english"],
    computed: {
        getStoreFilter(){
                return this.$store.state.carlistStore.filters.filter(item => item.k == this.english)[0];
            },
        v(){
            if(this.getStoreFilter){
                console.log(this.getStoreFilter.v.split("to").map(item => new Date(Number(item))));
                return this.getStoreFilter.v.split("to").map(item => new Date(Number(item)));
            }else{
                //console.log(1)
                return [];
            }
        }
    },
    methods : {
        change(v){
            console.log(v)
            this.$store.dispatch("carlistStore/changeFilters", {"k":this.english, "v": v.map(item => Date.parse(item)).join("to")});
        }
    }
}
</script>

<style scoped lang="less">
</style>
