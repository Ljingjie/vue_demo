<template>
   <div>
       <!-- <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone> -->
       <input type="file" ref="fileCtrl" @change="upPic" hidden multiple>
       <Button @click="choosePic">选择文件</Button>
       <!-- <img :src="yulan" alt=""> -->
       <div style="height : 10px"></div>
       <div class="picbox" ref="picbox">
            <Pic v-for="(item, index) in files" :key="index" :file="item"></Pic>
       </div>
   </div>
</template>

<script>
    import vue2Dropzone from 'vue2-dropzone'
    import Pic from './Pic.vue'

    // export default {
    //     data(){
    //         return {
    //             dropzoneOptions: {
    //                 url: '/api/uppic',
    //                 thumbnailWidth: 150,
    //                 maxFilesize: 0.5,
    //                 headers: { "My-Awesome-Header": "header value" }
    //              }
    //         }       
    //     },
    //     components : {
    //          vueDropzone: vue2Dropzone
    //     },
    //     mounted () {
    //         $("#dropzone").sortable();
    //     }
    // }

    export default{
        data(){
            return {
                files : [],
                yulan : ""
            }
        },
        methods : {
            choosePic(){
                var e = document.createEvent("MouseEvents");
                e.initMouseEvent("click", false, false);
                this.$refs.fileCtrl.dispatchEvent(e);
            },
            upPic(){
                var files = this.$refs.fileCtrl.files;
                for(let i = 0 ; i < files.length ; i++){
                    this.files.push(files[i]);
                }
            }
        },
        components : {
            Pic
        },
        mounted(){
            this.$refs.picbox.addEventListener("dragenter", function(e){ 
                e.preventDefault(); 
            }, false);  

            this.$refs.picbox.addEventListener("dragover", function(e){ 
                e.preventDefault(); 
            }, false); 

            var self = this;
            this.$refs.picbox.addEventListener("drop", function(e){ 
                e.preventDefault(); 
                console.log(e.dataTransfer.files);//得到拖动的文件
                self.files.push(...e.dataTransfer.files)
                
            }, false);

            $(this.$refs.picbox).sortable();
        }
    }
</script>

<style scoped lang="less">
.picbox{
    min-height : 10px;
    overflow: hidden;
}
</style>