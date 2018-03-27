<template>

  <div>
    <v-topbarback text="还款情况"></v-topbarback>
    <div class="content" >
      <ul>
        <!--<scroller style="top: 0px"-->
                  <!--:on-refresh="refresh"-->
                  <!--:on-infinite="infinite">-->
        <li class="backmoney-list">
          <!--<div class="backmoney-title">-->
            <!--<div class="back-title-l">-->
              <!--<img src="../assets/business_periods.svg"> <span>期数</span> <span class="qishu">第{{item.period}}期</span>-->
            <!--</div>-->
            <!--<div class="back-title-r">本期欠：{{item.oweAmount}}</div>-->
          <!--</div>-->
          <div class="backmoney-con">
            <div class="clearfix">
              <span class="back-con-l">应收本金（元）</span> <span class="back-con-r">{{data.should_repayPrincipal}}</span>
            </div>
            <div class="clearfix">
              <span class="back-con-l">实收本金（元）</span> <span class="back-con-r">{{data.real_repayPrincipal}}</span>
            </div>
            <div class="line"></div>
            <div class="clearfix">
              <span class="back-con-l">应收利息（元）</span> <span class="back-con-r">{{data.should_repayInterest}}</span>
            </div>
            <div class="clearfix">
              <span class="back-con-l">实收利息（元）</span> <span class="back-con-r">{{data.real_repayInterest}}</span>
            </div>
            <div class="line"></div>
            <div class="clearfix">
              <span class="back-con-l">应收罚息（元）</span> <span class="back-con-r">{{data.should_repayPenalty}}</span>
            </div>
            <div class="clearfix">
              <span class="back-con-l">实收罚息（元）</span> <span class="back-con-r">{{data.real_repayPenalty}}</span>
            </div>
          </div>
        </li>
        <!--</scroller>-->
      </ul>
      </div>

  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  import check from '@/util/check'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'yd_huankuanqingkuang',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId:this.$route.params.busiId,
          data:{}
//        list:[],
//        dataList:[],

      };
    },
    mounted(){
      this.getHuankuanList();
    },
    methods: {
//      refresh (done) {
//        this.list.length=0;
//        this.getHuankuanList(1);
//        done()
//      },
//      <!--infinite(done) {-->
//        <!--this.pageNum++;-->
//        <!--setTimeout(() => {-->
//          <!--if (this.dataList.length <1) {-->
//            <!--done(true)-->
//            <!--return;-->
//          <!--}else{-->
//            <!--this.getHuankuanList(this.pageNum)-->
//            <!--done()-->
//          <!--}-->
//
//        <!--}, 1500)-->
//      <!--},-->
      getHuankuanList(){
          this.$http.post(config.baseUrl+'/app/repaymentStatistics.do', {
              'busiId': this.busiId,
//              'pageNum': page,
//              'pageSize': this.pageSize,
          }, {
              headers: {
              },
              emulateJSON: true
          }).then(function(response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              console.log(response.data.data);
              this.data=response.data.data
//              this.list=this.list.concat(this.dataList)
//              if(this.list.length<=0){
//                  layer.open({
//                      content:'暂无数据',
//                      btn:['知道了'],
//
//                  })
//                  this.$router.go(-1);
//              }

          }, function(err) {
              this.$router.replace({ path: '/login/go' })
          });

      },
    }
  }
</script>


<style scoped>
  .backmoney-list{
    margin:0 .75rem;
  }
  .backmoney-title{
    font-size:.8rem;
    color:#808080;
    height:2rem;
    line-height:2rem;
    margin-top:.2rem;
  }
  .back-title-l{
    float:left;
  }
  .back-title-l img{
    vertical-align:middle;
    margin-right:.5rem;
  }
  .qishu{
    color:#3d3d3d;
  }
  .back-title-r{
    float:right;
    font-size:.7rem;
    color:#ff2244;
  }
  .backmoney-con{
    background:#ffffff;
    border:1px solid #e5e5e5;
    border-radius:4px;
    padding:.5rem;
    font-size:.8rem;
    color:#3d3d3d;
    margin-top:1rem;
  }
  .backmoney-con>div{
    line-height:2;
  }
  .back-con-l{
    float:left;
  }
  .back-con-r{
    float:right;
    color:#808080;
  }
  .backmoney-con>div.line{
    height:1px;

    background: #E5E5E5;
    border-radius: 4px;
    position:relative;
    line-height: 0;
    margin:.8rem 1rem;
  }
  .line:before{
    content:'';
    width:8px;
    height:10px;
    background-color:#f7f7f7;
    border-right:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    border-top:1px solid #e5e5e5;
    position:absolute;
    left: -31px;
    top: 50%;
    margin-top:-5px;
    border-radius:0  100px 100px 0;
    z-index:10;
  }
  .line:after{
    content:'';
    width:8px;
    height:10px;
    background-color:#f7f7f7;
    border-left:1px solid #e5e5e5;
    border-bottom:1px solid #e5e5e5;
    border-top:1px solid #e5e5e5;
    position:absolute;
    right: -31px;
    top: 50%;
    margin-top:-5px;
    border-radius:100px 0  0 100px;
    z-index:10;
  }

  .no-list{
    width:100%;
    height:90vh;
    background-color:#fff;
    line-height:90vh;
    font-size:.7rem;
    margin-bottom:3rem;
  }

</style>
