<template>
  <div class="page-group">
    <div class="page page-current">
        <v-topbarback v-if="$route.params.modelNo === 'business'" text="贷款审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'microPrint'" text="合同用印审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'outStorage'" text="解押出库审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'inStorage'" text="权证入库审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'outOfAccount'" text="出账放款审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'lender'" text="权证借出审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'classification'" text="五级分类审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'afterCheck'" text="贷后检查审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'debTransfer'" text="债权转让审批记录"></v-topbarback>
        <v-topbarback v-if="$route.params.modelNo === 'archivePrint'" text="P2P开户用印审批记录"></v-topbarback>
      <!-- 这里是页面内容区 -->
        <div class="content text-left" >
          <ul class="shenpi-list" v-if="list.length > 0">
            <li v-for="item in list">
              <!--//流程状态（active:代办 completed:已办ended:办结）-->
              <span class="status no" v-if="item.status == 'active'">待审批</span>
              <span class="status" v-if="item.status == 'completed'">已审批</span>
              <span class="status" v-if="item.status == 'ended'">已办结</span>
              <div class="mb5">
                <span class="sp-uname">{{item.currentapproveName}}</span>
                <span class="sp-zw">{{item.nodename}}</span>
              </div>
              <div class="sp-txt">审批意见：{{item.opition}}</div>
              <div class="sp-txt">审批时间：{{item.updatetime | delEndZero}}</div>
            </li>
          </ul>
          <div class="text-center no-list fz-16" v-if="list.length <= 0">暂无数据</div>
        </div>
    </div>
</div>
</template>
<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  import check from '@/util/check'
  export default{
    components : {
      'v-topbarback' : topbarback
    },
    //modelNo类型：权证入库记录inStorage、贷款审批记录business、五级分类审批记录classification、贷后检查审批记录afterCheck、
    data(){
      return {
        objectNo: this.$route.params.objectNo,
        modelNo: this.$route.params.modelNo,
        list:[]
      };
    },
    mounted(){
      this.getJiLuList()
    },
    methods:{
      getJiLuList(){
        this.$http.post(config.baseUrl + '/app/queryapprovelist.do', {
          'objectNo': this.objectNo,
          'modelNo':this.modelNo,
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.push({ path: '/login' })
            }
          if (response.data.statusCode == 200) {
            var result = response.data;
            this.list = result.list;
//            if(this.list.length<=0){
//                layer.open({
//                  content:'暂无数据',
//                  btn:['知道了'],
//
//                })
////            this.$router.go(-1);
//            }
          }
        }, function (err) {
            console.log(err);
            this.$router.replace({ path: '/login/go' })
        });

      }
    },
      filters : {
          delEndZero(value){
              if(value.indexOf('.0')){
                  return value.replace('.0','')
              }else{
                  return value
              }
          }
      }
  }
</script>
<style>
  .no-list{
    width:100%;
    height:90vh;
    background-color:#fff;
    line-height:90vh;
    font-size:.7rem;
    margin-bottom:3rem;
  }
</style>
