<template>

  <div>
    <v-topbarback text="贷后检查表单"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff">
      <div class="fill-blank"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">客户名称</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{name}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">业务品种</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{busiName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">余额</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{banlance}}元</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">贷后检查人</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{enterName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">贷后检查日期</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{checkDate}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">借款人基本情况</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{fundamentalCheck}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">担保情况</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{guaranteeCheck}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">风险预警</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{riskSignal}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">结论和建议</div>
      <div class="fl fz-14 width-60 text-left pd-15 c-80">{{conclusion}}</div>
      <div class="clearfix"></div>
      <div class="fill-blank"></div>
    </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  export default {
    name: 'yd_daihoujianchabd',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId: '',
        name: '',
        busiName: '',
        banlance: '',
        enterName: '',
        checkDate: '',
        fundamentalCheck: '',
        guaranteeCheck: '',
        riskSignal: '',
        conclusion: ''
      };
    },
    mounted(){
      this.getDaihouCheck()
    },
    methods: {
      getDaihouCheck(){
          this.$http.post(config.baseUrl + '/app/queryBusinessAfterloanStorageList.do', {
              'busiId': this.busiId
          }, {
              headers: {},
              emulateJSON: true
          }).then(function (response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              if(response.data.statusCode == 200){
                  var result = response.data.list;
                  this.name = result[0].name,
                      this.busiName = result[0].busiName,
                      this.banlance = result[0].banlance,
                      this.enterName = result[0].enterName,
                      this.checkDate = result[0].checkDate,
                      this.fundamentalCheck = result[0].fundamentalCheck,
                      this.guaranteeCheck = result[0].guaranteeCheck,
                      this.riskSignal = result[0].riskSignal,
                      this.conclusion = result[0].conclusion
              }
          }, function (err) {
              this.$router.replace({ path: '/login/go' })

          });

      }
    }
  }
</script>


<style scoped>

</style>
