<template>
   <div>
        <CheckboxGroup v-model="v">
            <Checkbox v-for="item in options" :key="item" :label="item"></Checkbox>
        </CheckboxGroup>
   </div>
</template>

<script>
    export default {
        props : ["options", "english"],
        computed : {
            getStoreFilter(){
                return this.$store.state.carlistStore.filters.filter(item => item.k == this.english)[0];
            },
            v : {
                get(){
                    if(this.getStoreFilter){
                        return this.getStoreFilter.v.split("v")
                      //console.log(this.getStoreFilter.v.split("v"))
                    }else{
                        return [];
                    }
                    //console.log(v)
                },
                set(v){
                    this.$store.dispatch("carlistStore/changeFilters", {"k":this.english, "v":v.join("v")});
                }
            }
        }
    }
</script>

<style scoped lang="less">
</style>
