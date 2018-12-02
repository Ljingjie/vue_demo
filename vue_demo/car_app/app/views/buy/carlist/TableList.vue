<template>
   <div>
       <Row class="row">
           <Col :span="1" :offset="23">
                <Button type="primary" shape="circle" icon="ios-aperture-outline" @click="showModal"></Button>
           </Col>
       </Row>
       <Table :columns="columns" :data="results" @on-sort-change="changeSort"></Table>
       <div style="{'height : 10px'}"></div>
       <Page :total="total" :current="page" :page-size="pagesize" show-sizer 
        @on-change="changePage" @on-page-size-change="changePagesize"/>
        <Modal
            v-model="isModal"
            title="自定义表格列"
            @on-ok="ok"
            @on-cancel="cancel">
            <div ref="modalbox" v-if="isModal"> 
                <!-- 加v-if防止拖拽时报错，还有e.target.closed的错误 -->
                <UserTable :colsSort="colsSort"/>
            </div>
        </Modal>
   </div>
</template>

<script>
    import UserTable from './tablegrid/UserTable.vue'
    import colsConfig from './tablegrid/colsConfig.js'

    export default {
        data(){
            return {
                isModal : false,
                colsSort : ["avatar" , "id" ,  "brand" , "series" , "price" , "km"],
                columns : []
            }
        },
        created() {
            this.getColumns();
        },
        computed: {
            results(){
                return this.$store.state.carlistStore.results;
            },
            total(){
                return this.$store.state.carlistStore.total;
            },
            page(){
                return this.$store.state.carlistStore.page;
            },
            pagesize(){
                return this.$store.state.carlistStore.pagesize;
            }
        },
        components : {
            UserTable
        },
        methods : {
            changeSort({column, key, order}){
                this.$store.dispatch("carlistStore/changeSort", {key, order});
                //console.log(e)
            },
            changePage(page){
                this.$store.dispatch("carlistStore/changePage", {page});
            },
            changePagesize(pagesize){
                this.$store.dispatch("carlistStore/changePagesize", {pagesize});
            },
            showModal(){
                this.isModal = true;
            },
            ok() {
                var arr = [];
                $(this.$refs.modalbox).find("#list2 li").each(function(){
                    arr.push($(this).attr("data-e"));
                });
                //console.log(arr)
                this.colsSort = [];
                this.colsSort = arr;
                //console.log(this.colsSort)
                this.getColumns();
                this.isModal = false;
            },
            cancel() {
                this.isModal = false;
            },
            getColumns(){
                this.columns = [];
                for(let i = 0; i < this.colsSort.length; i++){
                    for(let j = 0; j < colsConfig.length; j++){
                        if(colsConfig[j].key == this.colsSort[i]){
                            this.columns.push(colsConfig[j]);
                        }
                    }
                }
                //console.log(this.columns)
            }
        }
    }
</script>

<style scoped lang="less">
    .row{
        margin-bottom: 10px;
    }
</style>
