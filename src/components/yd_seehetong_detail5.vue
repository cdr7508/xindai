<template>
  <div>
    <v-topbarback text="合同详情"></v-topbarback>
    <div class="content  text-left">
      <div class="bg-fff">
        <div class="fill-blank"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">抵押合同编号</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{contractNo}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">抵押人</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{mortgager}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-340 pdl-15 c-3d">抵押权人</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{mortgagee}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-50 pdl-15 c-3d">抵押覆盖金额（万元）</div>
        <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{dutyAmount}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">保险</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80" v-if="isurance == 1">不办理保险</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80" v-if="isurance == 2">按照合同约定办理保险</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-20 pdl-15 c-3d">其他</div>
        <div class="agreen-shenpi2 width-80 text-right pd-15 c-80">{{rate}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">主借款合同</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{contractNo2}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">抵押物</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{assetDesc}}</div>
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
        mortgager: '',
        mortgagee: '',
        dutyAmount: '',
        isurance: '',
        rate: '',
        contractNo2: '',
        assetDesc: '',
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
            this.mortgager = result.mortgager;
            this.mortgagee = result.mortgagee;
            this.dutyAmount = result.dutyAmount;
            this.isurance = result.isurance;
            this.rate = result.rate;
            this.contractNo2 = result.contractNo2;
            this.assetDesc = result.assetDesc;
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
