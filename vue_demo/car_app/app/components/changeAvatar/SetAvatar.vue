<template>
   <div>
       <Modal
        v-model="modal1"
        title="更改头像"
        :width="modalW"
        @on-cancel="cancel">
        <div v-if="step == 1">
            <input type="file" ref="fileCtrl" hidden  @change="upPic"/>
            <Button @click="choosePic">请选择图片</Button>
        </div>
        <div v-if="step == 2">
            <Progress :percent="percent" status="active" />
        </div>
        <div v-if="step == 3">
            <div :style="{
                'width' : picW + paddingR +'px',
                'height' : (picH > 280 ? picH : 280)+'px'}">
                <CutPic :picUrl="picUrl" :picW="picW" :picH="picH" :cutInfo="cutInfo"/>
            </div>
        </div>
        <div slot="footer">
            <Button @click="cancel">取消</Button>
            <Button type="primary" v-show="step == 3" @click="ok">确定</Button>
        </div>
    </Modal>
   </div>
</template>

<script>
    import CutPic from './CutPic.vue';
    import axios from 'axios';

    export default {
        computed : {
            modalW(){
                if(!this.picUrl){
                    return "500px"
                }
                return this.picW + this.paddingR+'px'
            }
        },
        data(){
            return{
                modal1 : true,
                step : 1,
                percent : 0,
                //真实宽高
                picRealW : 0,
                picRealH : 0,
                //图片宽高
                picW : 0,
                picH : 0,
                //最小宽高
                minW : 400,
                minH : 250,
                //最大宽高
                maxH : 390,
                maxW : 700,
                paddingR : 200,
                picUrl : "",
                cutInfo : {
                    y : 0,
                    x : 0,
                    w : 100,
                    h : 100
                }
            }
        },
        components : {
            CutPic
        },
        // mounted(){
        //     this.setWH();
        // },
        methods : {
            cancel(){
                this.$emit("close")
            },
            ok(){
                axios.post("/api/cut", {
                    picurl : this.picUrl,
                    cut_rect_x : this.cutInfo.x,
                    cut_rect_y : this.cutInfo.y,
                    cut_rect_w : this.cutInfo.w,
                    cut_rect_h : this.cutInfo.h,
                    picRealW : this.picRealW,
                    picRealH : this.picRealH,
                    picW : this.picW,
                    picH : this.picH
                });
                this.$emit("close");
            },
            choosePic(){
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", false, false);
                this.$refs.fileCtrl.dispatchEvent(evt);
            },
            upPic(){
                var self = this;
                var form = new FormData();
                form.append("avatar", this.$refs.fileCtrl.files[0])
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        // alert("成功")
                        var obj = JSON.parse(xhr.responseText);
                        self.picUrl = obj.filename;
                        self.picRealW = obj.width;
                        self.picRealH = obj.height;
                        self.setWH();
                    }
                }
                xhr.upload.onprogress = function(e){
                    self.percent = (e.loaded / e.total) *100;
                    console.log(self.percent)
                    if(self.percent == 100){
                        self.step = 3
                    }
                }
                xhr.open("POST", "/api/upavatar", true);
                xhr.send(form)
                this.step = 2;
            },
            setWH(){
                this.picW = this.picRealW;
                this.picH = this.picRealH;
                if(this.picRealW > this.maxW){
                    this.picW = this.maxW;
                    this.picH = this.picRealH / (this.picRealW / this.maxW);
                }
                if(this.picRealH > this.maxH){
                    this.picH = this.maxH;
                    this.picW = this.picRealW / (this.picRealH / this.maxH);
                }
            }
        }
    }
</script>

<style scoped lang="less">
</style>
