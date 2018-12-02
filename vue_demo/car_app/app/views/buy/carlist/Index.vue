<template>
   <div>
       <FilterBox/>
       <div :style="{'height' : '10px'}"></div>
       <TableList/>
       <CompareBtn/>
   </div>
</template>

<script>
    import TableList from './TableList.vue'
    import FilterBox from './FilterBox.vue'
    import CompareBtn from '../../../components/CompareBtn.vue'

    export default {     
        beforeCreate() {
            this.$store.dispatch("carlistStore/getcars")
        },
        components: {
            TableList,
            FilterBox,
            CompareBtn
        }
    }
</script>

<style scoped lang="less">
</style>
