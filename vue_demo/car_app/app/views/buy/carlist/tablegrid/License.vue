<template>
   <div>
       {{get()}}
   </div>
</template>

<script>
    export default {
        props : ["row"],
        methods : {
            get(){
                if(this.row.license){
                    return "是"
                }
                return "否"
            }
        }
    }
</script>

<style scoped lang="less">
</style>
