<template>
   <div class="box">
       <div class="wrap">
           <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="username">
                    <Input type="text" v-model="formInline.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit()">Signin</Button>
                </FormItem>
        </Form>
       </div>
   </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data () {
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                axios.post("/api/login", {
                    "username" : this.formInline.username,
                    "password" : this.formInline.password
                }).then(data =>{
                    if(data.data.result == 1){
                        this.$router.push({"name" : "index"});
                    }else{
                        this.$Message.error('用户名或密码不正确');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        width : 100%;
        height : 100%;
        background : #eee;
        position: absolute;

        @w : 400px;
        @h : 200px;
        .wrap{
            background : white;
            width : @w;
            height : @h;
            position: absolute;
            top: 50%;
            left : 50%;
            margin-left : -@w/2;
            margin-top : -@h/2;
            padding : 20px;
        }
    }
        
</style>
