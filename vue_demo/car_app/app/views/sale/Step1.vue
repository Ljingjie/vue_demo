<template>
   <div>
       <Row>
           <Col :span="12" :offset="3">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name"></Input>
                    </FormItem>
                    <FormItem label="身份证号" prop="idCard">
                        <Input v-model="formValidate.idCard"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="sex">
                         <RadioGroup v-model="formValidate.sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="品牌车系" prop="brand">
                        <Cascader :data="data" trigger="hover" v-model="brands"></Cascader>
                    </FormItem>
                    <FormItem label="购买日期" prop="buydate">
                        <DatePicker type="date" placeholder="Select date" style="width: 200px" v-model="formValidate.buydate"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    </FormItem>
                </Form>
           </Col>
       </Row>
        
   </div>
</template>

<script>
    export default {
        data(){
            return {
                formValidate : {
                    name : "",
                    idCard : "",
                    sex : "",
                    brand : "",
                    series : "",
                    buydate : ""
                },
                ruleValidate : {
                    name : [
                        {required: true, message: '必须填写', trigger: 'blur'},
                        {type : "string", pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '请填写合法姓名'}
                    ],
                    idCard : [
                        {required: true, message: '必须填写', trigger: 'blur'},
                        {type : "string", pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请填写合法证件号'}
                    ],
                    sex : [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ],
                    brand : [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ],
                    buydate : [
                        {required: true, message: '必须填写'}
                    ]
                },
                data : [
                    {
                        value: 'A',
                        label: 'A',
                        children: [
                            {
                                value: '奥迪',
                                label: '奥迪',
                                children : [
                                    {
                                        value : "A4",
                                        label : "A4"
                                    },
                                    {
                                        value : "A3",
                                        label : "A3"
                                    },
                                    {
                                        value : "A6",
                                        label : "A6"
                                    }
                                ]
                            },
                            {
                                value: '奥拓',
                                label: '奥拓'
                            },
                            {
                                value: 'aosika',
                                label: '奥斯卡'
                            }
                        ]
                    }, 
                    {
                        value: 'B',
                        label: 'B',
                        children: [
                            {
                                value: '宝马',
                                label: '宝马',
                                children: [
                                    {
                                        value: 'x1',
                                        label: 'x1',
                                    }
                                ]
                            },
                            {
                                value: '宝骏',
                                label: '宝骏',
                                children: [
                                    {
                                        value: 's1',
                                        label: 's1',
                                    },
                                    {
                                        value: 's2',
                                        label: 's2',
                                    }
                                ]
                            }
                        ],
                    }
                ]
            }
        },
        computed : {
            brands : {
                get(){
                    return [];
                },
                set(v){
                    //console.log(v)
                    this.formValidate.brand = v[1];
                    this.formValidate.series = v[2];
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(valid);
                        this.$Message.success('Success!');
                        this.$store.dispatch("saleStore/changeStep", {"n":2});
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
</style>
