<template>
   <div>
       <Row>
           <Col :span="11">
                <Slider range :min="min/conversion" :max="max/conversion" :value="v"
                    @on-change="changeValue"
                    @on-input="changev"></Slider>
           </Col>
           <Col :span="11" :offset="1">
                <Input v-model="v1"  style="width: 50px" />
                ~
                <Input v-model="v2"  style="width: 50px" />
                <Button @click="submit()">确定</Button>
           </Col>
       </Row>
   </div>
</template>

<script>
export default {
    props : ["conversion", "min", "max", "english"],
    data(){
        return{
            v1 : this.min / this.conversion,
            v2 : this.max / this.conversion
        }
    },
    computed : {
       getStoreFilter(){
                return this.$store.state.carlistStore.filters.filter(item => item.k == this.english)[0];
            },
        v(){
            if(this.getStoreFilter){
                this.v1 = this.getStoreFilter.v.split("to")[0] / this.conversion;
                this.v2 = this.getStoreFilter.v.split("to")[1] / this.conversion;
                return this.getStoreFilter.v.split("to").map(item => item / this.conversion);
                //console.log(this.getStoreFilter.v.split("to"));
            }else{
                return [this.min, this.max];
            }
        }
    },
    methods : {
        changeValue(v){
            //console.log(v)
            this.$store.dispatch("carlistStore/changeFilters", {"k":this.english, "v":v.map(item => item * this.conversion).join("to")});
        },
        changev(v){
            this.v1 = v[0];
            this.v2 = v[1];
        },
        submit(){
            if(isNaN(this.v1) || isNaN(this.v2)){
                this.$Message.info('请输入数值');
                return;
            }
            if(this.v1 > this.v2){
                this.$Message.info('请输入正确的范围');
                return;
            }
            this.$store.dispatch("carlistStore/changeFilters", {"k":this.english, "v":[this.v1 * this.conversion, this.v2 * this.conversion].join("to")});
        }
    }
}
</script>

<style scoped lang="less">
</style>
