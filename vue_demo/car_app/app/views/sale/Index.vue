<template>
   <div>
       <div class="box">
            <Steps :current="n-1">
                <Step :title="changeStep(1)" content="填写信息"></Step>
                <Step :title="changeStep(2)" content="上传图片"></Step>
                <Step :title="changeStep(3)" content="这里是该步骤的描述信息"></Step>
                <Step :title="changeStep(4)" content="这里是该步骤的描述信息"></Step>
            </Steps>
            <div style="height : 20px"></div>
            <div :is="'Step'+n"></div>
            <div style="height : 20px"></div>
       </div>
   </div>
</template>

<script>
    import Step1 from './Step1.vue'
    import Step2 from './Step2.vue'

    export default {
        computed : {
            n(){
                return this.$store.state.saleStore.n;
            }
        },
        methods : {
            changeStep(i){
                if(i < this.n){
                    return "已完成";
                }else if(i == this.n){
                    return "进行中";
                }else{
                    return "待进行";
                }
            }
        },
        components : {
            Step1,
            Step2
        }
    }
</script>

<style scoped lang="less">
.box{
    padding : 50px 100px;
}
</style>
