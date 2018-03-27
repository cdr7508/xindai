<template>
    <div class="page-group">
        <div class="page page-current">
            <div class="content">
                <header class="bar bar-nav top-bar">
                    <img src="../../assets/return.svg" class="back" @click="goBack">
                    <p class="title2">拒绝审批</p>
                    <p class="fl-r top-sure" @click="jujue">确认</p>
                    <!--@click="jujue"-->
                </header>
                <div class="content bg-fff">
                    <div class="fill-blank"></div>
                    <div>
                        <textarea class="input-agreen" placeholder="请输入拒绝意见（非必填）" v-model="approvement"></textarea>
                    </div>
                    <div class="bg-gray"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from '@/config/config'
    import check from '@/util/check'
    import getuser from '@/util/getuser'
    export default {
        data(){
            return {
                approvement:'',
                isClick:false
            };
        },
    methods : {
        goBack () {
            this.$router.goBack()
        },
        jujue(){

                if(!this.approvement){
                    layer.open({
                        content:'请填写意见',
                        btn:['知道了']
                    })
                    return
                }
            if(this.isClick===false){
                var _this = this;
                this.isClick =true;
                this.$http.post(config.baseUrl+'/app/submitFlow.do', {
                    'id':getuser().id,
                    'busiId':this.$route.params.busiId,
                    'objectNo':this.$route.params.objectNo,
                    'result':'return',
                    'modelNo':this.$route.params.modelNo,
                    'paramMap.approvement':this.approvement,
                    'ids':[],
                    'paramMap.guaranteeDate':'',
                    'paramMap.guaranteefee_real':'',
                    'paramMap.instorageNo':'',
                    'paramMap.presidentAmount':'',
                    'paramMap.presidentRate':'',
                    'paramMap.presidentMonth':'',
                    'paramMap.replyContent':'',
                    'paramMap.five_state_final':'',
                    'paramMap.loanTime':'',
                    'paramMap.loanMoney':'',
                    'paramMap.loanDepart':'',
                    'paramMap.loanAccount':'',
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.push({ path: '/login' })
                    }
                    if(response.data.statusCode==200){
                        layer.open({
                            content:response.data.message,
                            btn:['知道了'],
                            yes:function(index){
                                _this.$router.push({ path: '/home/task' });
                                layer.close(index);
                            }
                        })
                    }else{
                        layer.open({
                            content:'数据请求异常，稍后再试',
                            btn:['知道了']
                        })
                    }
                }, function(err) {
                    this.$router.replace({ path: '/login/go' })
                });

            }

        }
    }

    }
</script>
<style scoped>
    .back{
        position:absolute;
        left:.4rem;
        top:50%;
        width:.7rem;
        margin-top:-.7rem;
    }
    .top-bar{
        height:3.2rem;
    }
    .top-bar .title{
        line-height:3.2rem;
        color:#fff;
    }
    .top-bar .title2{
        position:absolute;
        left:1.6rem;
        top:0;
        font-size:.85rem;
        line-height:3.2rem;
        color:#ffffff;
    }
    .top-sure{
        font-size:.85rem;
        line-height:3.2rem;
        color:#ffffff;
    }
</style>
