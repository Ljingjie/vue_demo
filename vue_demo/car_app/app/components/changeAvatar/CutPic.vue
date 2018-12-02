<template>
   <div>
       <div class="left" :style="{
                    'width' : picW+'px',
                    'height' : picH+'px'
                }">
           <img :src="`http://127.0.0.1:3000/${picUrl}`" 
                :style="{
                    'width' : picW+'px',
                    'height' : picH+'px'
                }">
            <span ref="drag" 
                :style="{
                    'width' : cutInfo.w + 'px',
                    'height' : cutInfo.h + 'px',
                    'top' : cutInfo.y + 'px',
                    'left' : cutInfo.x + 'px'
                }"
            >
                <img :src="`http://127.0.0.1:3000/${picUrl}`" 
                :style="{
                    'width' : picW+'px',
                    'height' : picH+'px',
                    'top' : -cutInfo.y +'px',
                    'left' : -cutInfo.x + 'px'
                }">
                <div class="top"></div>
                <div class="down"></div>
                <div class="left"></div>
                <div class="right"></div>
            </span>
       </div>
       <div class="right">
           <div v-for="item in boxW" :key="item" 
                :style="{'width': item+'px', 'height': item+'px'}"
           >
                <img :src="`http://127.0.0.1:3000/${picUrl}`" 
                    :style="{
                        'width' : item / (cutInfo.w / picW) + 'px',
                        'height' : item / (cutInfo.w / picH) + 'px',
                        'top' : -item * (cutInfo.y / cutInfo.w) + 'px',
                        'left' : -item * (cutInfo.x / cutInfo.w) + 'px',
                    }"
                >
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        props : ["picW", "picH", "picUrl", "cutInfo"],
        data(){
            return{
                boxW : [120, 90, 60]
            }
        },
        mounted(){
            var self = this;
            $(self.$refs.drag).draggable({
                containment : "parent",
                drag(event, ui){
                    self.cutInfo.y = ui.position.top;
                    self.cutInfo.x = ui.position.left;
                    //console.log( self.top, self.left)
                }

            })
            $(self.$refs.drag).resizable({
                containment : "parent",
                aspectRatio : true,
                resize(event, ui){
                    self.cutInfo.w = ui.size.width;
                    self.cutInfo.h = ui.size.height;
                    //console.log( self.top, self.left)
                }
            })
        }
    }
</script>

<style scoped lang="less">
    .left{
        float : left;
        margin-right: 40px;
        position: relative;
        &::before{
            position: absolute;
            content: "";
            top : 0;
            left : 0;
            width : 100%;
            height : 100%;
            background : #000;
            opacity : 0.6;
        }
        span{
            position: absolute;
            overflow : hidden;
            img{
                position: absolute;
            }
            @t : 200s;
            div.top{
                position: absolute;
                top: 0;
                left : 0;
                width : 5000px;
                height : 0px;
                border-top : 1px dotted #fff;
                animation: top @t linear 0s infinite;
            }
            @-webkit-keyframes top{
                from{
                    left : -2500px;
                }
                to{
                    left : 0px;
                }
            }
            div.down{
                position: absolute;
                bottom: 0;
                left : 0;
                width : 5000px;
                height : 0px;
                border-bottom : 1px dotted #fff;
                animation: bottom @t linear 0s infinite;
            }
            @-webkit-keyframes bottom{
                from{
                    left : 0px;
                }
                to{
                    left : -2500px;
                }
            }
            div.left{
                position: absolute;
                top: 0;
                left : 0;
                width : 0px;
                height : 5000px;
                border-left : 1px dotted #fff;
                animation: left @t linear 0s infinite;
            }
            @-webkit-keyframes left{
                from{
                    top : 0px;
                }
                to{
                    top : -2500px;
                }
            }
            div.right{
                position: absolute;
                top: 0;
                right : 0;
                width : 0px;
                height : 5000px;
                border-left : 1px dotted #fff;
                animation: right @t linear 0s infinite;
            }
            @-webkit-keyframes right{
                from{
                    top : -2500px;
                }
                to{
                    top : 0px;
                }
            }
            
        }
    }
    .right{
        float : left;
        &>div{
            border : 1px solid #000;
            margin-bottom: 20px;
            overflow: hidden;
            img{
                position: relative;
            }
        }
    }
</style>
