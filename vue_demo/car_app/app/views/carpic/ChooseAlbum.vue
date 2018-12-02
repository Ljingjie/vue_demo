<template>
   <div>
       <div class='album' v-if="carinfo.images">
           <ul>
                <li v-for="item in arr" :key="item.eng" :class="{'cur': item.eng == album}" @click="changeAlbum(item.eng)">
                    {{item.chin}}({{carinfo.images[item.eng].length}})
                </li>
            </ul>
       </div>
   </div>
</template>

<script>
    export default {
         computed : {
            carinfo(){
                return this.$store.state.carInfoStore.carinfo;
            },
            album(){
                return this.$store.state.carInfoStore.album;
            }
        },
        methods : {
            changeAlbum(album){
                this.$store.dispatch("carInfoStore/changeAlbum", {album});
            }
        },
        data(){
            return {
                arr : [
                   {"eng" : "view", "chin" : "外观"},
                   {"eng" : "inner", "chin" : "室内"},
                   {"eng" : "engine", "chin" : "结构"},
                   {"eng" : "more", "chin" : "更多"}
                ]
                
            }
        }
    }
</script>

<style scoped lang="less">
.album{
    width : 310px;
    overflow: hidden;
    ul{
        list-style: none;
        width : 320px;
        li{
            width : 150px;
            height : 30px;
            float : left;
            margin-right : 10px;
            margin-bottom: 10px;
            background : #aaa;
            text-align: center;
            line-height: 30px;
            &.cur{
                background-color :cornflowerblue;
            }
        }
    }
}

</style>
