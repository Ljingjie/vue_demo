<template>
    <div class="box">
        <img src="/images/loading.svg" ref="gif" class="gif">
         <div class="picbox" ref="picbox">
            <img ref="img" class="img">
            <div class="pre" @click="goPre()"></div>
            <div class="next" @click="goNext()"></div>
        </div>
    </div>
   
</template>

<script>
    export default {
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
            }
        },
        //上树和下数两次要调用一样
        mounted(){
            //监听窗口改变
            window.addEventListener("resize", this.setMargin, true)
        },
            //当组件下树的时候去掉监听
        destroyed(){
            window.removeEventListener("resize" , this.setMargin, true);
        },
        methods : {
           changePic(){
               const smallImgURL = `http://127.0.0.1:3000/images/carimages_small/${this.id}/${this.album}/${this.carinfo.images[this.album][this.idx]}`;
               const bigImgURL = `http://127.0.0.1:3000/images/carimages/${this.id}/${this.album}/${this.carinfo.images[this.album][this.idx]}`;

                this.$refs.img.style.display = "none";
                this.$refs.gif.style.display = "block";

                var smallImg = new Image();
                smallImg.src = smallImgURL;
                var bigImg = new Image();
                bigImg.src = bigImgURL;

                var self = this;
                smallImg.onload = function(){
                    self.$refs.img.style.display = "block";
                    self.$refs.img.src = smallImgURL;
                    self.$refs.gif.style.display = "none";
                }
                bigImg.onload = function(){
                    self.$refs.img.src = bigImgURL;
                    self.setMargin();
                }
           },
           setMargin(){
               var imgW = (document.documentElement.clientWidth - 350) * 0.9;
                this.$refs.picbox.style.width = imgW + 'px';
                this.$refs.picbox.style.marginLeft = -imgW/2 + 'px';
                var imgH = parseInt(getComputedStyle(this.$refs.img)["height"]);
                this.$refs.picbox.style.marginTop = -imgH/2 + 'px';
           },
           goPre(){
               this.$store.dispatch("carInfoStore/goPre")
           },
           goNext(){
               this.$store.dispatch("carInfoStore/goNext")
           }
        },
        watch : {
            carinfo(){
                this.changePic();
            },
            album(){
                this.changePic();
            },
            idx(){
                this.changePic();
            }
        }
    }
</script>

<style scoped lang="less">
.box{
    position: relative;
    height : 100%;
    .gif{
            width : 200px;
            height : 200px;
            position : absolute;
            top : 50%;
            left : 50%;
            margin-top : -100px;
            margin-left : -100px;
        }
    .picbox{
        position: absolute;
        left : 50%;
        top : 50%;
        .img{
            width : 100%;
        }
        .pre{
            position : absolute;
            left : 0;
            top: 33%;
            width : 40%;
            height : 33%;
            cursor: url(/images/cursor_left.cur), auto;
        }
        .next{
            position : absolute;
            right : 0;
            top: 33%;
            width : 40%;
            height : 33%;
            cursor: url(/images/cursor_right.cur), auto;
        }
    }
    
}

</style>
