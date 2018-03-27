<template>

  <div>
    <v-topbarback text="出账记录"></v-topbarback>
    <div class="content text-left">
      <scroller style="top: 0px"
                :on-refresh="refresh"
                :on-infinite="infinite">
        <div class="bg-fff" v-if="list.length > 0" v-for="item in list">
          <div class="fill-blank"></div>
          <div class="agreen-shenpi width-50 pdl-15 c-3d">批复总金额(万元)</div>
          <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{presidentAmount}}</div>
          <div class="clearfix"></div>
          <div class="fill-blank"></div>
          <div class="agreen-shenpi width-50 pdl-15 c-3d">已放款金额(万元)</div>
          <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{loansum}}</div>
          <div class="clearfix"></div>
          <div class="fill-blank"></div>
          <div class="agreen-shenpi width-30 pdl-15 c-3d">本次放款日期</div>
          <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{item.loanTime}}</div>
          <div class="clearfix"></div>
          <div class="fill-line"></div>
          <div class="agreen-shenpi width-50 pdl-15 c-3d">本次放款金额</div>
          <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="item.loanMoney > 0">{{item.loanMoney}}万元
          </div>
          <div class="clearfix"></div>
          <div class="fill-line"></div>
          <div class="agreen-shenpi width-30 pdl-15 c-3d">本次放款账号</div>
          <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{item.accountNo}}</div>
          <div class="clearfix"></div>
          <div class="fill-line"></div>
          <div class="agreen-shenpi width-50 pdl-15 c-3d">本次放款户名</div>
          <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{item.accountName}}</div>
          <div class="clearfix"></div>
        </div>
        <!--<div class="text-center no-list fz-16" v-if="list.length <= 0">暂无动态</div>-->
      </scroller>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  //  import axios from '@/config/http'
  import config from '@/config/config'
  import check from '@/util/check'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'yd_chuzhangjilu',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId: this.$route.params.busiId,
        pageNum: 1,
        pageSize: 6,
        list: [],
        presidentAmount:'',
        loansum:''
      };
    },
    mounted(){
      this.getChuzhangList(1)
    },
    methods: {
      refresh (done) {
        this.list.length = 0;
        this.getChuzhangList(1);
        done()
      },
      infinite(done) {
        this.pageNum++;
        setTimeout(() => {
          if (this.dataList.length < 1) {
            done(true)
            return;
          } else {
            this.getChuzhangList(this.pageNum)
            done()
          }

        }, 1500)
      },
      getChuzhangList(page){
        this.$http.post(config.baseUrl + '/app/queryOutAccountStatistics.do', {
          'busiId': this.busiId,
          'pageNum': page,
          'pageSize': this.pageSize
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.replace({ path: '/login/go' })
            }
          if (response.data.statusCode == 200) {
            this.dataList = response.data.list
            this.list = this.list.concat(this.dataList)
            this.loansum=(response.data.busiMap.loansum/10000).toFixed(2)
            this.presidentAmount=response.data.busiMap.presidentAmount
//          var result = response.data;
//          this.list = result.list;
//            if (this.list.length <= 0) {
//              layer.open({
//                content: '暂无数据',
//                btn: ['知道了'],
//              })
//              this.$router.go(-1);
//            }
          }
        }, function (err) {
            this.$router.replace({ path: '/login/go' })

        });

      }

    }
  }
</script>
<style scoped>
  .no-list {
    width: 100%;
    height: 90vh;
    background-color: #fff;
    line-height: 90vh;
    font-size: .7rem;
    margin-bottom: 3rem;
  }
</style>
