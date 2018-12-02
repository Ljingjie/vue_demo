<template>
    <div class="warp">
        <router-link :to="{'name':'carpic', 'params': {'id' : row.id}}">
            <img :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`" alt="">
        </router-link>
        <span class="jrdb" v-if="!isCompare" @click="addDB()">加入对比</span>
        <span class="db" v-if="isCompare">正在对比</span>
        <span class="qxdb" v-if="isCompare" @click="delDB()">取消对比</span>
    </div>
</template>

<script>
    export default {
        props : ["row"],
        data(){
            return{
                isCompare : false
            }
        },
        created () {
            this.setCompare();
        },
        computed : {
            cars(){
                return this.$store.state.compareStore.cars;
            }
        },
        methods : {
            addDB(){
                if(this.cars.length < 5){
                   // this.isCompare = true;
                    this.$Message.info("加入对比成功!");                    
                    this.$store.dispatch("compareStore/addcar", {"carinfo":this.row})
                }else{
                    this.$Message.error("最多对比5辆车!");
                }
                
            },
            delDB(){
                //this.isCompare = false;
                this.$store.dispatch("compareStore/delcar", {"id":this.row.id})
                this.$Message.info("取消对比成功!");
            },
            setCompare(){
                this.cars.forEach(item => {
                    if(item.id == this.row.id){
                        this.isCompare = true;
                        return;
                    }
                });
            }
        },
        watch : {
            //监控全局
            cars(){
                this.setCompare();
            }
        }
    }
</script>

<style scoped lang="less">
    .warp{
        position : relative;
        img{
            width : 100%;
        }
        span{
            position: absolute;
            top : 0;
            right : 0;
            width : 40%;
            height : 20%;
            display: none;
            color : white;
            text-align: center;
            cursor: pointer;
            &.jrdb{
                background :orangered;
            }
            &.db{
                background :red;
                display: block;
            }
            &.qxdb{
                background :green;            
            }
            
        }
        &:hover span.jrdb{
            display : block;
        }
        &:hover span.db{
            display : none;
        }
        &:hover span.qxdb{
            display : block;
        }
    }
    
</style>