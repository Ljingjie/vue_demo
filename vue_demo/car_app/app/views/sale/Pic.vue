<template>
   <div class="box">
       <div :class="{'picbox':true, 'success' : precent == 100}" :style="{'background-image':`url(${yulan})`}">
           <div class="progress">
               <span :style="{'width':precent + '%'}"></span>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        props : ["file"],
        data(){
            return {
                precent : 0,
                yulan : ""
            }
        },
        created () {
            var self = this;
            var fr = new FileReader();
            fr.readAsDataURL(this.file);
            fr.onload = function(event){
                self.yulan = event.srcElement.result;
            }
            var form = new FormData();
            form.append("tupian", this.file)
            //console.log(this.$refs.fileCtrl.files[0])
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    // alert("成功")
                }
            }
            xhr.upload.onprogress = function(e){
                self.precent = (e.loaded / e.total) *100;
            }
            xhr.open("POST", "/api/uppic", true);
            xhr.send(form)
        }
    }
</script>

<style scoped lang="less">
    .picbox{
        width : 150px;
        height : 200px;
        float : left;
        background-size : cover;
        background-position: center center;
        margin-right : 10px;
        margin-bottom : 10px;
        position: relative;
        &::before{
            content : "";
            position: absolute;
            width : 100%;
            height : 100%;
            background : #000;
            opacity : 0.5
        }
        &.success::before{
            opacity : 0;
        }
        .progress{
            position: absolute;
            width : 100px;
            height : 10px;
            border-radius: 5px;
            top :50%;
            left : 50%;
            margin-top: -5px;
            margin-left : -50px;
            background : #eee;
            span{
                display: block;//转块
                width : 10px;
                height:10px;
                border-radius: 5px;
                background : #fff;
                transition: all 0.3s ease 0s;
            }
        }
        &.success .progress{
            display : none;
        }
    }
</style>
