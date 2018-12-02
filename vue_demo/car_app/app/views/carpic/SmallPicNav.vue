<template>
   <div v-if="carinfo.images" @mouseleave="backToPage()">
       <div class="carousel" :style="{'left' : -(page-1) *320 +'px'}">
           <ul v-for="i in totalPage" :key="i">
               <li v-for="j in 6" :key="j" v-if="getImg(i, j)" 
                    :class="{'cur' : idx == (i - 1) * 6 + (j - 1)}"
                    @click="changeIdx((i - 1) * 6 + (j - 1))">
                    <Loading :picurl="`http://127.0.0.1:3000/images/carimages_small/${id}/${album}/${getImg(i, j)}`" :w="150" :h="100"/>
               </li>
            </ul>
       </div>
       <div class="slider">
           <span v-for="i in totalPage" :key="i" 
           :style="{'flex':1}"
           :class="{'cur' : page == i}"
           @mouseenter = "changeTotalPage(i)"
           ></span>
       </div>
       
   </div>
</template>

<script>
    export default {
        data(){
            return {
                page : 1
            }
        },
        computed : {
            id(){
                return this.$route.params.id;
            },
            carinfo(){
                return this.$store.state.carInfoStore.carinfo;
            },
            album(){
                return this.$store.state.carInfoStore.album;
            },
            idx(){
                return this.$store.state.carInfoStore.idx;
            },
            totalPage(){
                return Math.ceil(this.carinfo.images[this.album].length / 6)
            }
        },
        methods : {
            getImg(i, j){
                return this.carinfo.images[this.album][(i -1) * 6 + (j - 1)];
            },
            changeIdx(idx){
                this.$store.commit("carInfoStore/changeIdx", {idx});
            },
            changeTotalPage(i){
                 this.page = i;
            },
            backToPage(){
                 this.page = parseInt(this.idx / 6) + 1;
            }
        },
        watch : {
            //当全局的nowIdx变化的时候，要改变一下局部page，因为有的没有第二页，他自己不会回去
            idx(){
                this.page = parseInt(this.idx / 6) + 1;
            }
        }
    }
</script>

<style scoped lang="less">
.carousel{
    width : 5000px;
    overflow: hidden;
    position: relative;
    transition: all 0.4s ease 0s;
    ul{
        float : left;
        list-style : none;
        width : 320px;
        overflow : hidden;
        li{
            float : left;
            margin-right: 10px;
            position: relative;
            width : 150px;
            height : 100px;
            margin-bottom: 5px;
            &::before{
                content: "";
                position : absolute;
                top : 0;
                left : 0;
                width : 100%;
                height : 100%;
                background : black;
                opacity : 0.6;
            }
            &.cur::before{
                opacity : 0;
            }
        }
    }
}

.slider{
    width : 320px;
    display: flex;
    justify-content:space-around;
    span{
        //float : left;
        height : 10px;
        margin-right : 10px;
        background : #aaa;
        border-radius: 5px;
        &.cur{
            background-color :cornflowerblue;
        }
    }
}
</style>
