<template>
   <div class='wrap'>
       <div class='left'>
           <BigPic/>
       </div>
       <div class='right'>
           <div class='carinfo'>
               <CarInfo/>
           </div>
           <div clas='choosealbum'>
               <ChooseAlbum/>
           </div>
           <div class='smallpicnav'>
               <SmallPicnav/>
           </div>
           <CompareBtn/>
       </div>

   </div>
</template>

<script>
    import BigPic from './BigPic.vue'
    import CarInfo from './CarInfo.vue'
    import ChooseAlbum from './ChooseAlbum.vue'
    import SmallPicnav from './SmallPicNav.vue'
    import CompareBtn from '../../components/CompareBtn.vue'

    export default {
        components : {
            BigPic,
            CarInfo,
            ChooseAlbum,
            SmallPicnav,
            CompareBtn
        },
        beforeCreate() {
            this.$store.dispatch("carInfoStore/loadSever",{"id" : this.$route.params.id})
        },
    }
</script>

<style scoped lang="less">
.wrap{
    width : 100%;
    height : 100%;
    background : black;
    position: absolute;
    top : 0;
    left : 0;
    color : white;
    .right{
        position: absolute;
        width : 350px;
        height : 100%;
        right : 0;
        top : 0;
        border-left : 1px solid #ccc;
        padding : 20px;
        div{
            margin-bottom: 20px;
            overflow: hidden;
        }
    }
    .left{
        position: relative;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
        padding-right : 350px;
    }
}
</style>
