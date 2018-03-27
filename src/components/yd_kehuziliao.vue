<template>
  <div>
    <v-topbarback text="客户资料"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff ">
      <div class="fill-blank"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">客户名称</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{name}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">身份证号码</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{identification}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">联系方式</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{phoneNumber}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">性别</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="gender === 'female'">女</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="gender === 'male'">男</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">所在省市</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{provinceName}}{{cityName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">通讯地址</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{address}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">开户行</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{openbank1}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">开户账号</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{bankName1}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">婚姻状态</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{marriage}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">配偶姓名</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{spouse}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">配偶联系方式</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{spousePhoneNumber}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">年收入（万元/年）</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{incomeYear}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">有无子女</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="hasChildren  == 1">有</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="hasChildren  == 0">无</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="hasChildren  == -1">未知</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-60 pdl-15 c-3d">征信报告有无不良记录</div>
      <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord  == 1">有</div>
      <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord  == 0">无</div>
      <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord  == -1">未知</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">征信报告贷款余额</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{balance}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">征信报告逾期次数</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{overdueNO}}次</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">客户其他情况概述范围</div>
      <div class="fl fz-14 width-50 text-right pd-15 c-80">{{description}}</div>
      <div class="clearfix"></div>
      <div class="fill-blank"></div>
    </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  import check from '@/util/check'
  export default {
    name: 'yd_kehuziliao',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        custId:this.$route.params.custId,
        name:'',
        identification:'',
        phoneNumber:'',
        gender:'',
        provinceName:'',
        cityName:'',
        address:'',
        bankName1:'',
        openbank1:'',
        marriage:'',
        spouse:'',
        spousePhoneNumber:'',
        incomeYear:'',
        hasChildren:'',
        hasBadrecord:'',
        balance:'',
        overdueNO:'',
        description:'',

      };
    },
    mounted(){
       this.getKehuziliao();
    },
    methods:{
      getKehuziliao(){
        if(this.custId!=null){
          this.$http.post(config.baseUrl + '/app/readCustInfoStatistics.do', {
            'custId':this.custId,
          }, {
            headers: {},
            emulateJSON: true
          }).then(function (response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
            if (response.data.statusCode == 200) {
              var result = response.data.data;
              this.name = result.name;
              this.identification = result.identification;
              this.phoneNumber = result.phoneNumber;
              this.gender = result.gender;
              this.provinceName = result.provinceName;
              this.cityName = result.cityName;
              this.address = result.address;
              this.bankName1 = result.bankName1;
              this.openbank1 = result.openbank1;
              this.marriage = result.marriage;
              this.spouse = result.spouse;
              this.spousePhoneNumber = result.spousePhoneNumber;
              this.incomeYear = result.incomeYear;
              this.hasChildren = result.hasChildren;
              this.hasBadrecord = result.hasBadrecord;
              this.balance = result.balance;
              this.overdueNO = result.overdueNO;
              this.description = result.description;
            }
          }, function (err) {
              this.$router.replace({ path: '/login/go' })
          });
        }
      }
    },
  }


</script>


<style scoped>
</style>
