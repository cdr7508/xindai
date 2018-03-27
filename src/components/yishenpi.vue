<template>
    <scroller style="top: 0px"
            :on-refresh="refresh"
            :on-infinite="infinite">
        <div v-for="(item, index) in items" class="sp-list-item">
            <router-link :to="{path: '/sort/',query: { 'modelname':item.modelname,'objectNo':item.objectNo,'status':item.status,'busiId':item.busiid,'nodeno':item.nodeno,'modelNo':item.modelNo,'custType':item.custType,'cusName':item.cusName,'enterTime':item.enterTime,'opition':item.opition,'custId':item.custId,'enterName':item.enterName}}">
            <div class="sp-list-img">
                <img src="../assets/task_apply.svg">
            </div>
            <div class="sp-list-con">
                <span class="sp-status no" v-if="item.status=='active'">待审核</span>
                <span class="sp-status" v-if="item.status=='completed'">已审批</span>
                <span class="sp-status ok"  v-if="item.status=='ended'">已办结</span>
                <div class="sp-list-head">来自{{item.enterName}}的申请 <span class="kf">（客户：{{item.cusName}}）</span></div>
                <div class="sp-text">申请类型：{{item.modelname}}</div>
                <div class="sp-text">发起时间：{{item.enterTime}}</div>
                <div class="sp-text" v-if="item.status!=='ended'">当前环节：{{item.approveName}}</div>
            </div>
            </router-link>
        </div>
    </scroller>

</template>
<script>
    import topbarback from '@/components/topbarback/topbarback'
    import config from '@/config/config'
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'
    import check from '@/util/check'
    import getuser from '@/util/getuser'
    Vue.use(VueScroller)
    export default {
        components : {
            'v-topbarback' : topbarback
        },
        data(){
            return {
                items : [],
                pageNum:1,
                pageSize:6,
                dataList:[],
                req:false
            };
        },
        mounted() {
            this.getDate(1);
            this.top = 1
            this.bottom = 6
        },
        methods : {
            refresh (done) {
                this.items.length=0;
                this.getDate(1);
                done()
            },
            infinite(done) {
                setTimeout(() => {
                    if (this.dataList.length <1) {
                        done(true)
                        return;
                    }else{

                        if(this.req==false){
                            this.pageNum++;
                            this.getDate(this.pageNum)
                        }
                        done()
                    }

                }, 1500)
            },
            getDate(page){
                this.req=true;
                this.$http.post(config.baseUrl+'/app/handledTask.do', {
                    'id' : getuser().id,
                    'pageNum':page,
                    'pageSize':this.pageSize
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    this.req=false;
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    this.dataList=response.data.list
                    this.items=this.items.concat(this.dataList)

                }, function(err) {
                    this.$router.replace({ path: '/login/go' })

                });

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
</style>
