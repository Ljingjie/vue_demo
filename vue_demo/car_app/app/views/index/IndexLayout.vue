<template>
   <div>
       <Layout>
        <Header>
                <Menu mode="horizontal" theme="dark"
                    :active-name="$store.state.routerStore.columnname"
                    @on-select="selectHandler">
                    <div class="layout-logo">
                        <img src="/images/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="md-home" />
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                           <Icon type="md-nutrition" />
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                            <Icon type="md-pizza" />
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="logo-tux" />
                            用户
                        </MenuItem>
                        <MenuItem name="park">
                            <Icon type="ios-paper"></Icon>
                            停车场
                        </MenuItem>
                        <div class="avatar">
                            <Poptip trigger="hover" placement="bottom">
                                <div slot="content" class="slot">
                                    <p><a href="#" @click="showModal">更改头像</a></p>
                                    <p><a href="#">退出登录</a></p>
                                </div>
                                <Avatar style="cursor:pointer" icon="ios-person" v-if="!avatar"/>
                                <Avatar style="cursor:pointer" icon="avatar" v-if="avatar"
                                    :src="`http://127.0.0.1:3000/images/avatars/${username}.jpg`"/>
                            </Poptip>
                            {{name}}
                            <SetAvatar v-if="isShow"  @close="closeModal"></SetAvatar>
                        </div>
                    </div>
                </Menu>
            </Header>
        </Layout>
        <router-view></router-view>
   </div>
</template>

<script>
    export default {
        computed : {
            name(){
                return this.$store.state.meStore.name;
            },
            avatar(){
                return this.$store.state.meStore.avatar;
            },
            username(){
                return this.$store.state.meStore.username;
            }
        },
        data(){
            return{
                isShow : false
            }
        },
        methods : {
            selectHandler(n){
                if(n == "buy"){
                    n = "carlist";
                }
                this.$router.push({"name" : n});
                //alert(n)
            },
            showModal(){
                this.isShow = true;
            },
            closeModal(){
                this.isShow = false;
            }
        }
    }
</script>

<style scoped lang="less">
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 350px;
        height: 40px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 12px;
        left: 20px;
    }
    .layout-nav{
        width: 780px;
        margin: 0 auto;
        margin-right: 20px;

        .avatar{
            color : #fff;
            .slot{
                font-size: 14px;
                text-align: center;
                p{
                    margin-bottom: 5px;
                }
            }
        }
    }
    .ivu-menu-horizontal .ivu-menu-item{
        font-size:20px;
    }

</style>
