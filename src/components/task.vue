<template>
    <div>
        <v-header text="审批"></v-header>
        <div class="content">
            <div class="persin-info">
                <div class="person-info-head clearfix">
                    <div class="fl"><img src="../assets/task_head.svg" class="mr5">
                        <span class="uname">{{user.realName}}</span></div>
                    <router-link to="/set"><span class="set fr">设置</span></router-link>
                </div>
                <div class="person-info-desc clearfix">
                    <p><img src="../assets/task_department.svg" class="pi-img mr5"><span>部门：{{user.appDepartment}}</span></p>
                    <p><img src="../assets/task_post.svg" class="pi-img mr5"><span>岗位：{{user.appMainPosition}}</span></p>
                </div>
                <div>
                    <span class="person-login-time">上次登录时间：{{user.time | formatDate}}</span>
                </div>
            </div>
            <div class="home-menu">
                <div class="home-menu-item">
                    <router-link to="/shenpi/weishenpi">
                        <img src="../assets/task_check1.svg">
                        <div>
                            <h3>待我审核</h3>
                            <span>未处理 <b>{{topUnhandledNum}}</b> 项</span></div>
                    </router-link>
                </div>
                <div class="home-menu-item">
                    <router-link to="/shenpi/yishenpi">
                        <img src="../assets/task_check2.svg">
                        <div>
                            <h3>我已审批</h3>
                            <span>已处理完成</span></div>
                    </router-link>
                </div>
            </div>
            <div class="m10-0">
                <div class="pri-title">最新动态</div>

                <div class="sp-list" v-if="list.length>0">

                        <li v-for="item in list" @click="goDetail(item)">

                        <div class="sp-list-img">
                            <img src="../assets/task_apply.svg">
                        </div>
                        <div class="sp-list-con">
                            <span class="sp-status no" v-if="item.status=='active'">待审核</span>
                            <span class="sp-status" v-if="item.status=='completed'">已审核</span>
                            <span class="sp-status ok"  v-if="item.status=='ended'">已办结</span>
                            <div v-if="item.modelNo=='archivePrint'" class="sp-list-head">来自{{item.enterName}}的申请 
                                <span class="kf">（客户：{{item.title}}）</span>
                            </div>
                            <div v-else class="sp-list-head">来自{{item.enterName}}的申请 
                                <span class="kf">（客户：{{item.cusName}}）</span>
                            </div>
                            <div class="sp-text">申请类型：{{item.modelname}}</div>
                            <div class="sp-text">发起时间：{{item.enterTime}}</div>
                        </div>
                            <!--</router-link>-->
                    </li>

                </div>
                <!--<div class="text-center no-list" v-if="list.length<1">暂无动态</div>-->
                <div class="showmore" v-if="list.length>0">
                    <router-link to="/shenpi/weishenpi">查看更多>></router-link>
                </div>
                <div class="loading" v-show="load">
                    <div class="preloader"></div>
                    <span class="vm">加载中...</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import topbar from '@/components/topbar/topbar'
    import {formatDate} from '@/util/util.js';
    import config from '@/config/config'
    import check from '@/util/check'
    import {mapMutations} from 'vuex';
    import getuser from '@/util/getuser'

    export default {
        name : 'task',
        components : {
            'v-header' : topbar,
        },
        data(){
            return {
                user : getuser(),
                list:[],
                userLoginTime:'',
                topUnhandledNum:'',
                load:false
            };
        },
        mounted(){
            //列表、待办、预警
            this.chkIndex();
            this.getDataNum();
            this.getDataList();
        },
        methods:{
          ...mapMutations(['modifyTip']),
            chkIndex(){
                if(this.user.id==''){
                    this.$router.push('/home/task');
                }
            },
            goDetail(item){
                console.log(1);
                this.$router.push({ path: '/sort/', query: {  'modelname':item.modelname,'objectNo':item.objectNo,'status':item.status,'busiId':item.busiid,'nodeno':item.nodeno,'modelNo':item.modelNo,'custType':item.custType,'cusName':item.cusName,'enterTime':item.enterTime,'opition':item.opition,'custId':item.custId,'enterName':item.enterName,'title':item.title}})
            },
            getDataNum(){

                var _this = this;
                this.load=true;
                this.$http.post(config.baseUrl+'/app/index.do', {
                    'id' : this.user.id
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response){
                    this.load=false;
                    if(response.data.code ==1001){
//                        alert(1001);
                        this.$router.replace({ path: '/login/go' })
                        return ;
                    }
                    if(response.data.statusCode==200){
                        var data = response.data;
                        let res = response.data.data
                        this.topUnhandledNum=res.unhandledNum;
                        this.modifyTip({warnNum:res.warnNum,unhandledNum:res.unhandledNum})
                    }else{
                        this.$router.replace({ path: '/login/go' })
//                        layer.open({
//                            content:'请求失败，请退出重新登录',
//                            btn:['知道了']
//                        })
                    }

                }, function(err){
                    this.$router.replace({ path: '/login/go' })
//                    layer.open({
//                        content:'数据请求失败，请退出重新登录',
//                        btn:['知道了']
//                    })
                });

              } ,
              getDataList(){
                var _this = this;
                this.load=true;
                this.$http.post(config.baseUrl+'/app/index2.do', {
                    'id' : this.user.id
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response){
                    console.log(response.data.code);
                    this.load=false;
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                        return ;
                    }
                    if(response.data.statusCode==200){
                        var data = response.data;
                        let res = response.data.data
                        this.list=res.list;
                    }else{
                        this.$router.replace({ path: '/login/go' })
//                        layer.open({
//                            content:'请求失败，请退出重新登录',
//                            btn:['知道了']
//                        })
                    }
                }, function(err){
                    this.$router.replace({ path: '/login/go' })
//                    layer.open({
//                        content:'数据请求失败，请退出重新登录',
//                        btn:['知道了'],
//                    })
                });

              }
        },
        filters : {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .no-list{
        width:100%;
        height:36vh;
        background-color:#fff;
        line-height:36vh;
        font-size:.7rem;
       margin-bottom:3rem;
    }
    .loading{
        position:fixed;
        z-index:9999;
        width:100%;
        left: 0;
        bottom:20%;
    }
    .loading div{vertical-align:middle;}
    .vm{ vertical-align:middle;}
</style>
