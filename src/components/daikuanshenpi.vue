<template>
  <div class="page-group">
    <div class="page page-current">
      <v-topbarback-one :text="$route.query.enterName+'的申请'"></v-topbarback-one>
      <!-- 这里是页面内容区 -->
      <div class="content ">
        <!--<div>{{$route.query}}</div>-->
        <div class="bg-fff mb-50">
        <div class="mlr-15">
          <div class="person-info-head clearfix pdt-15">
            <div class="fl"><img src="../assets/task_head.svg" class="mr5"> <span class="uname">{{$route.query.enterName}}</span> <span class="c-blue fz-14">（客户：{{$route.query.cusName}}）</span></div>
            <span class="wait-sp fr" v-if="$route.query.status==='completed'"><b class="c-blue">已审批</b></span>
            <span class="wait-sp fr" v-if="$route.query.status==='active'"><b class="color-warning">等待我审批</b></span>
            <span class="wait-sp fr" v-if="$route.query.status==='ended'"><b class="color-danger">已办结</b></span>
          </div>
          <div class="text-info2 c-80">申请类型：{{$route.query.modelname}}</div>
          <div class="text-info3 c-80">发起时间：{{$route.query.enterTime}}</div>
          <div class="clearfix"></div>
        </div>
        <div class="fill-blank"></div>
        <router-link :to="{name:'yd_detail2',params: {'busiId':$route.query.busiId}}">
          <p  class="m-15 text-left">
          <img src="../assets/business_1.svg" class="pi-img2">
          <span class="ml-15 c-3d fz-16">业务详情</span>
          <img src="../assets/next.svg" class="fl-r right-arrow mr5">
        </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <div v-if="$route.query.custType == 2">
        <router-link :to="{name:'yd_kehuziliao',params: { 'custId':$route.query.custId }}">
          <p  class="m-15 text-left">
            <img src="../assets/business_2.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">客户资料</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
        </p>
        </router-link>
          <div class="bd-line mlr-15"></div>
      </div>
        <div v-if="$route.query.custType == 1">
        <router-link :to="{name:'yd_kehuziliao_qy',params: { 'custId':$route.query.custId }}">
          <p  class="m-15 text-left">
            <img src="../assets/business_2.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">客户资料</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
        </p>
        </router-link>
          <div class="bd-line mlr-15"></div>
        </div>

        <router-link :to="{name:'yd_fujianqindan',params: { 'busiId':$route.query.busiId }}">
          <p class="m-15 text-left">
          <img src="../assets/business_4.svg" class="pi-img2">
          <span class="ml-15 c-3d fz-16">附件清单</span>
          <img src="../assets/next.svg" class="fl-r right-arrow mr5">
        </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_danbaocuoshi',params: { 'busiId':$route.query.busiId}}">
        <p class="m-15 text-left">
          <img src="../assets/business_3.svg" class="pi-img2">
          <span class="ml-15 c-3d fz-16">担保措施</span>
          <img src="../assets/next.svg" class="fl-r right-arrow mr5"></p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'shenpijilu',params: {'objectNo':$route.query.objectNo,'modelNo':'business'}}">
          <p  class="m-15 text-left">
          <img src="../assets/business_5.svg" class="pi-img2">
          <span class="ml-15 c-3d fz-16">本流程处理记录</span>
          <img src="../assets/next.svg" class="fl-r right-arrow mr5">
        </p></router-link>
        <div class="fill-blank"></div>
          <div  v-if="$route.query.status==='completed' || $route.query.status==='ended'">
            <p class="m-15 text-left">
              <span class="c-3d fz-16">处理记录</span>
            </p>
            <div class="desc">
              {{$route.query.opition ? $route.query.opition : ''}}
            </div>
          </div>
          <div class="btn-ok" v-if="$route.query.nodeno=='0010' && $route.query.status=='active'">
            <p>该流程已被退回，请根据处理意见修改后到pc端重新提交</p>
          </div>
          <div class="bt-son" v-if="$route.query.status==='active' && $route.query.nodeno!='0010'">
          <router-link
                  :to="{name:'tongyi',params: {'busiId':$route.query.busiId,'objectNo':$route.query.objectNo,'modelNo':$route.query.modelNo,'nodeno':$route.query.nodeno,'custId':$route.query.custId,'status':$route.query.status}}">
            <div class="son c-blue">同意</div>
          </router-link>
          <router-link
                  :to="{name:'jujue',params: {'busiId':$route.query.busiId,'objectNo':$route.query.objectNo,'modelNo':$route.query.modelNo,'nodeno':$route.query.nodeno}}">
            <div class="son c-red">拒绝</div>
          </router-link>
          <div class="clearfix"></div>
        </div>
        <div class="btn-ok" v-if="$route.query.status=='completed' && $route.query.nodeno!='0010'">已审批</div>

      </div>
      </div>
    </div>
  </div>
</template>
<script>
    import topbarbackone from '@/components/topbarback/topbarback1'
    import config from '@/config/config'
//    var  user = JSON.parse(localStorage.getItem('userinfo'));
    export default {
      components : {
        'v-topbarback-one' : topbarbackone
      },
      data(){
        return {
            cusName: this.$route.query.cusName,
            businessNo:'',
            overbusinessNo:'',
            busiId: ''
        }
      },
      mounted(){
          this.getInf();
      },
      methods : {
        getInf(){
          this.$http.post(config.baseUrl+'/app/businessSignDealnew.do', {
                    'busiId':this.$route.query.busiId
                }, {
                    headers: {
                    },
                    emulateJSON: true
                }).then(function(response) {
                    if(response.data.code ==1001){
                        this.$router.replace({ path: '/login/go' })
                    }
                    console.log(response.data.data);
                    let data = response.data.data;
                    this.businessNo=data.businessNo;
                    this.overbusinessNo=data.overbusinessNo;
                    if(this.businessNo!=0){
                      layer.open({
                        content:'客户'+this.cusName+'已在我公司借款'+this.businessNo+'次，存在'+this.overbusinessNo+'次逾期。',
                        btn:['确定']
                      })
                    }else{
                      layer.open({
                        content:'客户'+this.cusName+'第一次在我公司借款。',
                        btn:['确定']
                      })
                    }
                    
                });
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content.bg-fff{
    background:#fff;
  }
  .bt-son{
    z-index:9999; background-color:#fff;
  }
  .text-info3{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .btn-ok{
    width:100%;
    height:100%;
    position:fixed;
    bottom:0;
    left: 0;
    z-index:9999;
    background-color:#ededed;
    height:2.5rem;
    line-height:2.5rem;
    color: #666;
  }  .btn-ok p{
       width:100%;
       height:100%;
       background-color:#fff;
       font-size:.6rem;
       line-height:2.5rem;
       color: #f00;
       border-top:1px solid #eee;
     }
  b{ font-weight:normal;}
  .desc{
    width:100%;
    min-height:4rem;
    font-size:.6rem;
    line-height:1.5;
    background-color:#ffffff;
    text-align:left;
    padding:.8rem;
  }
</style>
