<template>
  <div>
    <v-topbarback text="合同详情"></v-topbarback>
    <div class="content  text-left">
      <div class="bg-fff">
        <div class="fill-blank"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">借款编号</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{contractNo}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">借款人</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{borrower}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-20 pdl-15 c-3d">出借人</div>
        <div class="agreen-shenpi2 width-80 text-right pd-15 c-80">{{lender}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">合同金额(万元)</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{contractAmount}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">合同期限（月）</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{deadline}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">合同起期</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{contractStartDate}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">合同止期</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{contractDueDate}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">合同利率(%)</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{rate}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">借款用途</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{usage}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">付息方式</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80" v-if="payMethod == 1">按月付息，到期一次还本</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80" v-if="payMethod == 7">到期一次性还本付息</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">还款时间</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{payday}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-20 pdl-15 c-3d">罚息率</div>
        <div class="agreen-shenpi2 width-80 text-right pd-15 c-80">{{defaultInterest}}%</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-20 pdl-15 c-3d">其它</div>
        <div class="agreen-shenpi2 width-80 text-right pd-15 c-80">{{other}}</div>
        <div class="clearfix"></div>
        <div class="fill-blank"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  //  import axios from '@/config/http'
  import config from '@/config/config'
  import check from '@/util/check'
  export default {
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId: this.$route.params.busiId,
        contractType: this.$route.params.contractType,
        contractId: this.$route.params.contractId,
        contractNo: '',
        borrower: '',
        lender: '',
        contractAmount: '',
        deadline: '',
        contractStartDate: '',
        contractDueDate: '',
        rate: '',
        usage: '',
        payMethod: '',
        payday: '',
        defaultInterest: '',
        other: '',
      };
    },
    mounted(){
      this.getHetongDetail();
    },
    methods: {
      getHetongDetail(){
        this.$http.post(config.baseUrl + '/app/readContractInit.do', {
          'busiId': this.busiId,
          'contractType': this.contractType,
          'contractId': this.contractId,
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.replace({ path: '/login/go' })
            }
          if (response.data.statusCode == 200) {
            var result = response.data.data;
            this.contractNo = result.contractNo;
            this.borrower = result.borrower;
            this.lender = result.lender;
            this.contractAmount = result.contractAmount;
            this.deadline = result.deadline;
            this.contractStartDate = result.contractStartDate;
            this.contractDueDate = result.contractDueDate;
            this.rate = result.rate;
            this.usage = result.usage;
            this.payMethod = result.payMethod;
            this.payday = result.payday;
            this.defaultInterest = result.defaultInterest;
            this.other = result.other;
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
