<template>
   <div>
        <Badge :count="cars.length" class="badge">
            <Button class="btn" type="primary" @click="open">对比车辆</Button>
        </Badge>
       <CompareCar :isShow="isShow" @close="close"/>
   </div>
</template>

<script>
    import CompareCar from './CompareCar.vue'

    export default {
        computed : {
            cars(){
                return this.$store.state.compareStore.cars;
            }
        },
        data(){
            return{
                isShow : false
            }
        },
        components : {
            CompareCar
        },
        methods : {
            open(){
                this.isShow = true;
            },
            close(){
                this.isShow = false;
            }
        }
    }
</script>

<style scoped lang="less">
    .btn{
        position : fixed;
        bottom : 80px;
        right : 60px;
        border-radius: 5px;
        color : #fff;
        font-size: 14px;
    }
    .badge{ 
        position : fixed;
        bottom : 115px;
        right : 65px;
    }
</style>
