<template>

  <div>
    <v-topbarback text="业务详情"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff">
      <div class="fill-blank"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">经营层负责人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{operateLeaderName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">客户名称</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{name}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">业务品种</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{busiName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">产品</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{productName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">渠道</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{channelName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">申请金额（万元）</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="amount > 0">{{amount}}万元</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">申请期限</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="maturityDate > 0">{{maturityDate}}个月</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">申请利率</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="rate > 0">{{rate}}%</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">还款来源</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{payBackSource}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">借款用途</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{purpose}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">担保方式</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{guaranteeName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">主调查人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{mainInvestName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">贷后管理人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{afterLoanManageIdName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">当前状态</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-red">{{statusName}}</div>
        <div class="clearfix"></div>
        <div class="fill-blank"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import check from '@/util/check'
  import config from '@/config/config'
  export default{
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId:this.$route.params.busiId,
        operateLeaderName:'',
        name:'',
        busiName:'',
        productName:'',
        channelName:'',
        amount:'',
        maturityDate:'',
        rate:'',
        payBackSource:'',
        purpose:'',
        guaranteeName:'',
        mainInvestName:'',
        afterLoanManageIdName:'',
        statusName:'',
      };
    },
    mounted(){
      this.getDaiDetail()
    },
    methods:{
      getDaiDetail(){
        this.$http.post(config.baseUrl + '/app/businessDetail.do', {
          'busiId': this.busiId,
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.replace({ path: '/login/go' })
            }
          if (response.data.statusCode == 200) {
            var result = response.data.data;
          this.operateLeaderName = result.operateLeaderName;
          this.name = result.name;
          this.busiName = result.busiName;
          this.productName = result.productName;
          this.channelName = result.channelName;
          this.amount = result.amount;
          this.maturityDate = result.maturityDate;
          this.rate = result.rate;
          this.payBackSource = result.payBackSource;
          this.purpose = result.purpose;
          this.guaranteeName = result.guaranteeName;
          this.mainInvestName = result.mainInvestName;
          this.afterLoanManageIdName = result.afterLoanManageIdName;
          this.statusName = result.statusName;
          }
        }, function (err) {
            this.$router.replace({ path: '/login/go' })

        });
      }

    },
  }

</script>

<style scoped>
</style>
