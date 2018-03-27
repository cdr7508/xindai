<template>
  <div>
    <v-topbarback text="贷后检查记录"></v-topbarback>
    <div class="content text-left">
      <div class="m15-0">
        <div class="dj-title bdb">
          <div class="item-name">贷后检查日期</div>
          <div class="time">{{checkDate}}</div>
        </div>
        <ul class="dj-list">
          <li>
            <div class="dj-con">
              <h3>借款人基本情况检查</h3>
              <div>{{fundamentalCheck}}</div>
            </div>
          </li>
          <li>
            <div class="dj-con">
              <h3>担保情况检查</h3>
              <div>{{guaranteeCheck}}</div>
            </div>
          </li>
          <li>
            <div class="dj-con">
              <h3>风险预警</h3>
              <div>{{riskSignal}}</div>
            </div>
          </li>
          <li>
            <div class="dj-con">
              <h3>结论和建议</h3>
              <div>{{conclusion}}</div>
            </div>
          </li>
          <li>
            <div class="dj-con">
              <h3>经营层负责人意见</h3>
              <div>{{COMMENT}}</div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>

</template>


<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  export default {
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        id:this.$route.params.id,
        checkDate:'',
        fundamentalCheck:'',
        guaranteeCheck:'',
        riskSignal:'',
        conclusion:'',
        COMMENT:'',
      };
    },
    mounted(){
      this.getDaihouCheckList2();
    },
    methods: {
      getDaihouCheckList2(){
          this.$http.post(config.baseUrl + '/app/queryAfterLoanById.do', {
              'id': this.id
          }, {
              headers: {},
              emulateJSON: true
          }).then(function (response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              var result = response.data.data;
              this.checkDate = result.checkDate;
              this.fundamentalCheck = result.fundamentalCheck;
              this.guaranteeCheck = result.guaranteeCheck;
              this.riskSignal = result.riskSignal;
              this.conclusion = result.conclusion;
              this.COMMENT = result.COMMENT;
          }, function (err) {
              this.$router.replace({ path: '/login/go' })
          });

      },
    }
  }
</script>


<style scoped>
  .m15-0{
    margin:.75rem 0;
  }
  /*.dj-list{*/
  /*margin:.75rem 0;*/
  /*}*/
  .dj-list li{
    background-color:#fff;
    border-bottom:1px solid #e5e5e5;
  }
  .dj-list li:last-child{
    border-bottom:none;
  }
  .dj-title{
    padding:.6rem .75rem;
    overflow:hidden;
    background-color:#fff;
  }
  .item-name{
    font-size:.8rem;
    color:#3d3d3d;
    float:left;
  }
  .time{
    float:right;
    font-size:.8rem;
    color:#808080;
  }
  .dj-con{
    padding:.6rem .75rem;
  }
  .dj-con h3{
    font-size:.8rem;
    color:#3d3d3d;
    font-weight:normal;
  }
  .dj-con > div{
    font-size:.8rem;
    color:#808080;
    padding-left:1em;
    padding-top:.5rem;
  }
</style>
