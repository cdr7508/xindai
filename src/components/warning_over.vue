<template>

  <div>
    <v-topbarback text="逾期欠息清单"></v-topbarback>
    <div class="content">
      <scroller style="top: 0px"
                :on-refresh="refresh"
                :on-infinite="infinite">
        <div class="bg-fff mt-15" v-for="item in list">
          <div class="mlr-15 pdt-15 c-3d text-left">
            <p><img src="../assets/warn_borrower.svg" class="pi-img2 mr5">
              <span class="mr5 c-3d fz-16">流水号：{{item.busiid}}</span>
              <a :href="tel+item.tel"><img src="../assets/query_tel.svg" class="pi-img2 mr5"></a>
              <a :href="sms+item.tel+sms1+item.name+sms2+item.depAlias+sms3+item.over_date+sms4+item.shouldAmount+sms5"><img src="../assets/query_message.svg" class="pi-img2 mr5"></a>
              <span class="text-categray c-red">{{item.statusName}}</span>
            </p>
            <div class="text-info ">借款人：{{item.name}}</div>
            <div class="text-info">客户经理：{{item.afterLoanManageIdName}}</div>
            <div class="clearfix"></div>
            <div class="fill-line"></div>
            <div class="text-info">渠道：{{item.channelName}}</div>
            <div class="text-info">业务类型：{{item.busiName}}</div>
            <div class="clearfix"></div>
            <div class="fill-line"></div>
            <div class="text-info">利率：{{item.rateDisplay}}%</div>
            <div class="text-info">应还日期：{{item.should_repayDate}}</div>
            <div class="clearfix"></div>
            <div class="fill-line"></div>
            <div class="text-info">放款日：{{item.loantime}}</div>
            <div class="text-info">到期日：{{item.over_date}}</div>
            <div class="clearfix"></div>
            <div class="fill-line"></div>
            <div class="text-info">放款金额：{{item.loansum}}元</div>
            <div class="text-info">应还金额(不含罚息)：{{item.shouldAmount}}元</div>
            <div class="clearfix"></div>

          </div>
        </div>
      </scroller>

    </div>
  </div>
</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  import check from '@/util/check'
  import getuser from '@/util/getuser'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'warning_over',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        user: getuser(),
        pageNum: 1,
        pageSize: 6,
        list: [],
        dataList: [],
          req:false,
        tel:'tel:',
        sms:'sms:',
          sms1:'?body=尊敬的【',
          sms2:'】:您在【',
          sms3:'】:的借款应在【',
          sms4:'】还款【',
          sms5:'】元,现已逾期！请在1日内筹备资金足额还款，否则影响您的信用记录，谢谢合作！'
      };
    },
    mounted(){
        this.getWarnOverList(1)
    },
    methods: {
      refresh (done) {
        this.list.length=0;
        this.getWarnOverList(1);
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
                  this.getWarnOverList(this.pageNum)
              }
            done()
          }

        }, 1500)
      },
      getWarnOverList(page){
          this.req=true;
          this.$http.post(config.baseUrl+'/app/overdueList.do', {
              'userId': getuser().id,
              'specPriv':getuser().specPriv,
              'pageNum':page,
              'pageSize':this.pageSize
          }, {
              headers: {
              },
              emulateJSON: true
          }).then(function(response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              this.req=false;
              this.dataList=response.data.data.list
              this.list=this.list.concat(this.dataList)
//              if(this.list.length<=0){
//                  layer.open({
//                      content:'暂无数据',
//                      btn:['知道了'],
//
//                  })
//                  this.$router.go(-1);
//              }

          }, function(err) {
              this.$router.replace({ path: '/login/go' });
          });

      }
    }

  }
</script>


<style scoped>
</style>
