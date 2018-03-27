<template>

  <div>
    <v-header text="查询"></v-header>

    <div class="content mb-50">
      <div class="pos-top">
        <ul class="menu-tab ">
          <router-link to="/home/query" v-if="specPriv">
            <li>
              <span>总体情况</span>
            </li>
          </router-link>
          <li class="active">
            <span>业务查询</span>
          </li>
        </ul>
        <div class="bg-fff mt-60">
          <div class="text-center">
            <input class="name-imput bd-line mt-15 " type="text" placeholder="请输入借款人姓名" v-model="name">
            <div class="text-center ">
              <button class="mt-20 mb-20 common-btn" @click="getQueryList">开始查询</button>
            </div>
          </div>
        </div>
      </div>
      <div class="query-content">
        <scroller style="top: 0;"
          :on-infinite="infinite">
          <div class="bg-fff " v-if="list.length > 0" v-for="(item,index) in list">
            <div class="clearfix m-15 pdt-15 text-left">
              <p><img src="../assets/query_serial.svg" class="pi-img2 mr5"> <span class="mr5 c-3d fz-16">流水号：{{item.serialNo}}</span>
                <!--<img src="../assets/query_tel.svg" class="pi-img2 mr5">-->
                <a :href="tel+item.telphoneNo"><img src="../assets/query_tel.svg" class="pi-img2 mr5"></a>
                <!--<img src="../assets/query_message.svg" class="pi-img2 mr5">-->
                <a :href="sms+item.telphoneNo"><img src="../assets/query_message.svg" class="pi-img2 mr5"></a>
              </p>
            </div>
            <div class="mt-15">
              <table class="table-list2 ml-15">
                <tr>
                  <td>借款人：{{item.name}}</td>
                  <td>客户经理：{{item.afterLoanManageIdName}}</td>
                </tr>
                <tr>
                  <td>渠道：{{item.channelName}}</td>
                  <td>业务品种：{{item.busiName}}</td>
                </tr>
                <tr>
                  <td>借款期限：{{item.monthDisplay}}个月</td>
                  <td>放款金额：{{item.loanSum}}元</td>
                </tr>
                <tr>
                  <td>利率：{{item.rateDisplay}}%</td>
                  <td>状态：{{item.statusName}}</td>
                </tr>
                <tr>
                  <td>放款日：{{item.loanTime}}</td>
                  <td>到期日：{{item.over_date}}</td>
                </tr>
                <tr>
                  <td>余额（元）：{{item.banlance}}</td>
                  <td></td>
                </tr>
              </table>
            </div>
            <router-link :to="{name:'yewu_detail',params:{'busiId':item.busiid,'name':item.name,'custId':item.custId,'type':item.type}}">
              <p class="text-center pdb-15 see-detail">查看业务详情</p>
            </router-link>
          </div>
          <div class="nodata" v-show="nodata">没有更多了</div>
        </scroller>
      </div>

      <div class="loading" v-show="load">
        <div class="preloader"></div>
        <span class="vm">加载中...</span>
      </div>
    </div>
  </div>

</template>

<script>
  import Footbar from '@/components/footbar/FootBar'
  import topbar from '@/components/topbar/topbar'
  import config from '@/config/config'
  import check from '@/util/check'
  import getuser from '@/util/getuser'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'query_yewu',
    components: {
      'v-header': topbar
    },
    data(){
      return {
        id: getuser().id,
        name: '',
        list: [],
        tel: 'tel:',
        sms: 'sms:',
        specPriv: this.chkC(),
        load: false,
        pageNum: 1,
        pageSize: 6,
        result:[],
        req:false,
        nodata:false
      };
    },
    methods: {
      chkC(){
        let userinfo = getuser();
        console.log(userinfo);

        if (userinfo) {
          if (userinfo.specPriv && userinfo.specPriv != null) {
            if (userinfo.specPriv.indexOf('C') != -1) {
              return true;
            } else {
              return false
            }
          }
        } else {
          this.$router.push({path: '/login'})
        }
      },
      infinite(done) {

        setTimeout(() => {
          if (this.result.length < 1) {

              done(true)

            return;
          }else{
              if( this.req==false){
                this.getQueryListMore()
                this.pageNum++;
              }
            done()

          }

        }, 1500)

      },
      getQueryList(){
        this.list = [];
        this.pageNum= 1;
        if (!this.name) {
          layer.open({
            content: '请输入借款人姓名',
            btn: ['知道了'],
          })
          return;
        } else {
          this.load = true;
          this.req=true;
          this.$http.post(config.baseUrl + '/app/queryBusinessInitStatistics.do', {
            'id': this.id,
            'paramMap.name': this.name,
            'pageNum':this.pageNum,
            'pageSize':this.pageSize
          }, {
            headers: {},
            emulateJSON: true
          }).then(function (response) {
            this.load = false;
            if (response.data.code == 1001) {
              this.$router.replace({path: '/login/go'})
            }
            if (response.data.statusCode == 200) {
              this.result = response.data.list;
              this.list = this.list.concat(this.result);
              setTimeout(()=>{
                this.req=false;
              },3000)
            }

          }, function (err) {
            layer.open({
              content: '服务器出错了',
              btn: ['知道了'],
            })
          });
        }
      },
      getQueryListMore(){
          this.load = true;
          this.req=true;

          this.$http.post(config.baseUrl + '/app/queryBusinessInitStatistics.do', {
            'id': this.id,
            'paramMap.name': this.name,
            'pageNum':this.pageNum+1,
            'pageSize':this.pageSize
          }, {
            headers: {},
            emulateJSON: true
          }).then(function (response) {
            this.load = false;
            if (response.data.code == 1001) {
              this.$router.replace({path: '/login/go'})
            }
            if (response.data.statusCode == 200) {

              this.result = response.data.list;
              this.list = this.list.concat(this.result);
              if(this.result.length<1){
                this.nodata=true;
                console.log(111);
              }
              setTimeout(()=>{
                this.req=false;
              },3000)
            }

          }, function (err) {
            layer.open({
              content: '服务器出错了',
              btn: ['知道了'],
            })
          });

      }
    }
  }
</script>


<style scoped>
  .pos-top{
    position:fixed;
    top:2.5rem;
    width:100%;
    left: 0;
    z-index:99;
  }
  .query-content{
    width:100%;
    position:absolute;
    top:165px;
    bottom:0;
    left: 0;
  }
  .loading{
    position:fixed;
    z-index:9999;
    width:100%;
    left:0;
    bottom:35%;
  }
  .loading div{ vertical-align:middle; }
  .vm{ vertical-align:middle; }
</style>
