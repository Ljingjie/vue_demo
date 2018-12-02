<template>
   <div>
       <h2>
            {{carinfo.brand}}{{carinfo.series}}{{carinfo.color}}色{{carinfo.exhaust}}{{carinfo.price | xiaoshu(0)}}万
       </h2>
       <h6>
           {{carinfo.engine}}&nbsp;{{carinfo.km/10000 | xiaoshu(2)}}万KM&nbsp;{{carinfo.buydate | getyear}}年
       </h6>
   </div>
</template>

<script>
    export default {
        computed : {
            carinfo(){
                return this.$store.state.carInfoStore.carinfo;
            }
        }
    }
</script>

<style scoped lang="less">
</style>
