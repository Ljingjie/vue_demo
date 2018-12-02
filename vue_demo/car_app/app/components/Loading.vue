<template>
   <div>
       <div v-if="isLoad">
           <img :src="picurl" :style="{'width':w+'px', 'height':h+'px'}">
       </div>
       <div v-else>
           <img src="images/loading.svg" :style="{'width':w+'px', 'height':h+'px'}">
       </div>
   </div>
</template>

<script>
    export default {
        props : ["picurl", "w", "h"],
        data(){
            return {
                isLoad : false
            }
        },
        created () {
            this.loadPic();
        },
        methods : {
            loadPic(){
                var img = new Image(); //创建图片对象
                img.src = this.picurl; //发出请求
                var self = this; // 备份，监听是否加载完毕
                img.onload = function(){
                    self.isLoad = true;
                }
            }
        },
        watch : {
            picurl(){
                this.isLoad = false;
                this.loadPic();
            }
        }
    }
</script>

<style scoped lang="less">
</style>
