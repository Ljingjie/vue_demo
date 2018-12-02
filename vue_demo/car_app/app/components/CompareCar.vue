<template>
   <div>
        <Drawer title="车辆对比信息" :value="isShow" width="500" :closable="false" @on-close="closeDrawer">
           <ul>
               <li v-for="item in cars" :key="item.id">
                   {{item}}
               </li>
           </ul>
        </Drawer>
   </div>
</template>

<script>
    export default {
        props : ["isShow"],
        computed : {
            cars(){
                return this.$store.state.compareStore.cars;
            }
        },
        methods : {
            closeDrawer(){
                this.$emit("close")
            }
        }
    }
</script>

<style scoped lang="less">
</style>
