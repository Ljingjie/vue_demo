<template>
   <div>
       <Row v-for="item in filterControls" :key="item.english" class="row">
           <Col :span="3">{{item.chinese}}:</Col>
           <Col :span="21">
                <Fuxuan v-if="item.type == 'checkbox'" :options="item.options" :english="item.english"/>
                <Sliders v-if="item.type == 'slider'" :english="item.english" :conversion="item.conversion" 
                    :min="item.min" :max="item.max"/>
                <MyDatepicker :english="item.english" v-if="item.type == 'datepicker'"/>
           </Col>
       </Row>
       <Row class="row">
           <Col :span="3">当前选择:</Col>
           <Col :span="21">
           <Tag v-for="item in filters" :key="item.k" closable @on-close="closeTag(item.k)">
               {{getK(item.k)}} : {{getV(item.k, item.v)}}
            </Tag>
           </Col>
       </Row>
   </div>
</template>

<script>
    import Fuxuan from './filtergrid/Fuxuan.vue'
    import Sliders from './filtergrid/Sliders.vue'
    import MyDatepicker from './filtergrid/MyDatepicker.vue'
    import moment from 'moment'

    export default {
        computed: {
            filters(){
                return this.$store.state.carlistStore.filters;
            }
        },
        components : {
            Fuxuan,
            Sliders,
            MyDatepicker
        },
        methods : {
            getK(k){
                return this.filterControls.filter(item => item.english == k)[0].chinese;
            },
            getV(k, v){
               var type = this.filterControls.filter(item => item.english == k)[0].type;
               if(type == "checkbox"){
                   return v.replace(/v/g, "或");
               }else if(type == "slider"){
                    if(k == "price"){
                        return v.split("to").map(item=>item + "万元").join(" 到 ");
                    }else if(k == "km"){
                        return v.split("to").map(item=>item / 10000 + "万公里").join(" 到 ");
                    }
               }else if(type == "datepicker"){
                   return v.split("to").map(item => moment(Number(item)).format("YYYY年MM月DD日")).join("到");
               }  
            },
            closeTag(k){
                this.$store.dispatch("carlistStore/changeFilters", {"k":k, "v": ""});              
            }
        },
        data(){
            return{
                filterControls : [
                    {
                        "chinese" : "颜色",
                        "english" : "color",
                        "type" : "checkbox",
                        "options" : ["红","黄","绿","蓝","黑","白","灰","银灰","咖啡"]
                    },
                    {
                        "chinese" : "发动机",
                        "english" : "engine",
                        "type" : "checkbox",
                        "options" : ["1.0L","1.2L","1.6T","2.0L","2.0T","3.0L","4.0L"]
                    },
                    {
                        "chinese" : "排放标准",
                        "english" : "exhaust",
                        "type" : "checkbox",
                        "options" : ["国一","国二","国三","国四","国五"]
                    },
                    {
                        "chinese" : "变速箱",
                        "english" : "gearbox",
                        "type" : "checkbox",
                        "options" : ["手动","自动","手自一体"]
                    },
                    {
                        "chinese" : "燃料",
                        "english" : "fuel",
                        "type" : "checkbox",
                        "options" : ["汽油","柴油","纯电动","油电混合"]
                    },
                    {
                        "chinese" : "售价（万元）",
                        "english" : "price",
                        "type" : "slider",
                        "min" : 0,
                        "max" : 120,
                        "conversion" : 1
                    },
                    {
                        "chinese" : "公里数（万公里）",
                        "english" : "km",
                        "type" : "slider",
                        "min" : 0,
                        "max" : 2000000,        //真值
                        "conversion" : 10000    //将10000当做1
                    },
                    {
                        "chinese" : "购买日期",
                        "english" : "buydate",
                        "type" : "datepicker"
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .row{
        margin-bottom: 5px;
    }
</style>
