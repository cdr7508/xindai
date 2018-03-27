<template>
  <div>
    <v-header text="查询"></v-header>
    <div class="content bgf  mb-50">
      <ul class="menu-tab">
        <li class="active">
          <span>总体情况</span>
        </li>
        <router-link to="/query_yewu">
        <li>
          <span>业务查询</span>
        </li>
        </router-link>
      </ul>
      <div class="fill-blank"></div>
      <div class="query-con">
        <div class="text-center clearfix rel h40">
          <!--<div class="input-wrap"><datepicker v-model="stateTime"></datepicker></div>-->
          <!--<input class="date-input bd-line" type="date" ref="input1">-->
          <div class="input-wrap0"> <mu-date-picker hintText="" v-model="startTime" autoOk  hintText="开始日期" hintTextClass="tl"/></div>
          <!--<span class="qimg"><img class="mt-15" src="../assets/query_a.svg"></span>-->
          <span><img class="mt-15" src="../assets/query_a.svg"></span>
          <!--<input class="date-input bd-line" type="date" ref="input2">-->
          <div class="input-wrap1"><mu-date-picker v-model="endTime" autoOk/></div>
          <!--<div class="input-wrap1"><datepicker v-model="endTime"></datepicker></div>-->
        </div>
        <div class="text-center pdt-6 mlr-15 rel">
          <v-select :items="options" ref="select"></v-select>
          <div class="fill-line"></div>
        </div>
         <div class="text-center">
          <button class="mt-20 mb-20 common-btn" @click="startCheck">开始查询</button>
        </div>
        <div class="fill-blank"></div>
        <div class="text-left m0-10" v-if="list.length>0">
          <table class="table-list">
            <tr>
              <th v-if="zhuti">放款主体</th>
              <th v-if="chanpin">产品</th>
              <th v-if="leibie">业务类别</th>
              <th v-if="qudao">渠道</th>
              <th>期末余额(元)</th>
              <th>统计期放款额(元)</th>
            </tr>
            <tr v-for="item in list">
              <td v-if="zhuti">{{item.loanDepAlias}}</td>
              <td v-if="chanpin">{{item.productname}}</td>
              <td v-if="leibie">{{item.busiName}}</td>
              <td v-if="qudao">{{item.channelName}}</td>
              <td class="tr">{{item.oldbanlance}}</td>
              <td class="tr">{{item.newamount}}</td>
            </tr>
            <tr class="text-left">
              <td class="active" v-model="seq">{{seq}}</td>
              <td class="active tr" v-model="totalnewamount">{{totalnewamount}}</td>
              <td class="active tr" v-model="totaloldbanlance">{{totaloldbanlance}}</td>
            </tr>
          </table>
        </div>

        <div class="loading" v-show="load">
          <div class="preloader"></div>
          <span class="vm">加载中...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import topbar from '@/components/topbar/topbar'
  import select from '@/components/select/select'
  import config from '@/config/config'
  import check from '@/util/check'
  import getuser from '@/util/getuser'
  import {format} from '@/util/format.js';
  import Vue from 'vue'
  import MuseUI from 'muse-ui'
  import 'muse-ui/dist/muse-ui.css'
  Vue.use(MuseUI)
//  import date from 'datepicker-vue'
  var userinfo = getuser;
  export default {
    name: 'query',
    components: {
      'v-header': topbar,
      'v-select': select,
    },
    data(){
      return {
        zhuti:'',
        chanpin:'',
        leibie:'',
        qudao:'',
        seq:'',
        totalnewamount:'',
        totaloldbanlance:'',
        list:[],
        selected: null,
        options: ['按放款主体','按产品','按业务类别','按渠道'],
          startTime:''+this.getBegin(),
          endTime:''+ this.getEnd(),
          load:false,
      };
    },
      mounted(){
        this.chkC();
      },
    methods:{
        getBegin(){
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            return year+'-01-01';
        },
        getEnd(){
            var nowdays = new Date();
            var year = nowdays.getFullYear();
            var month = nowdays.getMonth();
            if(month==0)
            {
                month=12;
                year=year-1;
            }
            if (month < 10) {
                month = "0" + month;
            }
            var myDate = new Date(year, month, 0);
            var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
            return lastDay;
        },
        chkC(){
            let userinfo=getuser()
            let spec = userinfo.specPriv;
            if(!userinfo){
                this.$router.replace({ path: '/login'})
            }else if(spec!='' ||  spec!= null){
                if(spec.indexOf('C')==-1){
                    this.$router.replace({ path: '/query_yewu'})
                }
            }else{
                this.$router.replace({ path: '/query_yewu'})
            }
        },
      startCheck(){

        this.list=[];
        var condition = '';
        let select = this.$refs.select.selected;
        var us = getuser();
//        var text1 = this.$refs.input1.value;
//        var text2 = this.$refs.input2.value;

//        console.log(this.endTime);
//        console.log(this.startTime);
//        return ;
        if(select === '按放款主体'){
          condition = 'loandepart';
          this.zhuti  = true;
          this.chanpin  = false;
          this.leibie  = false;
          this.qudao  = false;
        }else if(select === '按产品'){
          condition = 'product';
          this.zhuti  = false;
          this.chanpin  = true;
          this.leibie  = false;
          this.qudao  = false;
        }else if(select === '按业务类别'){
          condition = 'busiType';
          this.zhuti  = false;
          this.chanpin  = false;
          this.leibie  = true;
          this.qudao  = false;
        }else if(select === '按渠道'){
          condition = 'channel';
          this.zhuti  = false;
          this.chanpin  = false;
          this.leibie  = false;
          this.qudao  = true;
        }
        if(!this.endTime){
            layer.open({
                content:'请先选择结束时间',
                btn:['知道了']
            })
            return ;
        }
          this.load=true;
          return this.$http.post(config.baseUrl+'/app/summaryStatistics1.do', {
              'id':us.id,
              'begin':this.startTime,
              'end':this.endTime,
              'condition':condition,
          }, {
              headers: {
              },
              emulateJSON: true
          }).then(function(response) {

              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }

              console.log('inner:'+this);
              this.load=false;
              this.seq = response.data.data.heji.seq;
              this.totalnewamount = response.data.data.heji.totaloldbanlance;
              this.totaloldbanlance = response.data.data.heji.totalnewamount;
              this.list  = response.data.data.list;
              if(this.list.length<1){
                  layer.open({
                      content:'暂无数据',
                      btn:['知道了']
                  })
              }

          }, function(err) {

          });


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .input-wrap0{
    width:40%;
    float:left;
    padding:.5rem 0;
    margin-left:.75rem;
    text-align:center;
  }

  .rel{ position:relative;}
  .qimg{
    position:absolute;
    left: 50%;
    top: 0;
    margin-left:-11px;
  }
  .input-wrap1{
    width:40%;
    overflow:hidden;
    float:right;
    padding:.5rem 0;
    margin-right:.75rem;
    text-align:center;
  }
  .input-wrapper{
    border:0;
  }
  .query-con{
    margin-top:2rem;
    background: #fff;
  }
  .bd-line{
    appearance:none;
  }
  .rel{ position:relative;}
 .pdlr-5{
   padding:0  .25rem;

 }
 .m0-10{
   margin:0 .5rem;
 }
  .tc{ text-align:center;}
  .mu-text-field-input{
    text-align:left;
    padding-left:1rem;
  }
  .mu-text-field-input{
    text-align:left;
    padding-left:1rem!important;
  }
  .btd{
    border-top:1px solid #e5e5e5;
  }
  .h40{ height:2.5rem;
    overflow:hidden;}
  .tl{ text-align:left;}
  .loading{
    position:fixed;
    z-index:9999;
    width:100%;
    left: 0;
    bottom:35%;
  }
  .loading div{vertical-align:middle;}
  .vm{ vertical-align:middle;}
</style>
