<template>
  <div>
    <v-topbarback text="客户资料"></v-topbarback>
    <div class="content text-left">
      <div class=" bg-fff ">
        <div class="fill-blank"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">客户名称</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{name}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">三证合一号</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{businessLicense}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">注册资金</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="registCapital > 0">{{registCapital}}万元</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">实缴资金</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="realCapital > 0">{{realCapital}}万元</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">法人代表姓名</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{legalPerson}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">法人代表身份证号</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{idNo}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">公司成立时间</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{establishDate}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">实际控股人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{realControl}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">注册地所在省市</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{provinceName}}{{cityName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">联系人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{linkman}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">联系人手机号</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{linkmanPhone}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">银行开户许可证</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{bankPermits}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">本户开户行</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{openbank}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">本户开户账号</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{bankNo}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-60 pdl-15 c-3d">征信报告有无不良记录</div>
        <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord ==0">无</div>
        <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord ==1">有</div>
        <div class="agreen-shenpi2 width-40 text-right pd-15 c-80" v-if="hasBadrecord ==-1">未知</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-50 pdl-15 c-3d">征信报告贷款余额</div>
        <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" >{{balance}}元</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">征信报告逾期次数</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-red">{{overdueNO}}次</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-60 pdl-15 c-3d">是否我公司股东</div>
        <div class="agreen-shenpi2 width-40 text-right pd-15 c-80">{{DICT_KEY}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">经营范围</div>
        <div class="fl fz-14 width-70 text-right pd-15 c-80">{{businessScope}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">通讯地址</div>
        <div class="fl fz-14 width-70 text-right pd-15 c-80">{{address}}</div>
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
  export default {
    name: 'yd_kehuziliao',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        custId: this.$route.params.custId,
        name: '',
        businessLicense: '',
        registCapital: '',
        realCapital: '',
        legalPerson: '',
        idNo: '',
        establishDate: '',
        realControl: '',
        provinceName: '',
        cityName: '',
        linkman: '',
        linkmanPhone: '',
        bankPermits: '',
        openbank: '',
        bankNo: '',
        hasBadrecord: '',
        balance: '',
        overdueNO: '',
        DICT_KEY: '',
        businessScope: '',
        address: '',
      };
    },
    mounted(){
      this.getKehuziliaoQY();
    },
    methods: {
      getKehuziliaoQY(){
        if (this.custId != null) {
          this.$http.post(config.baseUrl + '/app/readCustInfoStatistics.do', {
            'custId': this.custId,
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
              this.businessLicense = result.businessLicense;
              this.registCapital = result.registCapital;
              this.realCapital = result.realCapital;
              this.legalPerson = result.legalPerson;
              this.idNo = result.idNo;
              this.establishDate = result.establishDate;
              this.realControl = result.realControl;
              this.provinceName = result.provinceName;
              this.cityName = result.cityName;
              this.linkman = result.linkman;
              this.linkmanPhone = result.linkmanPhone;
              this.bankPermits = result.bankPermits;
              this.openbank = result.openbank;
              this.bankNo = result.bankNo;
              this.hasBadrecord = result.hasBadrecord;
              this.balance = result.balance ? result.balance : '0';
              this.overdueNO = result.overdueNO ? result.overdueNO:'0';
              this.DICT_KEY = result.DICT_KEY;
              this.businessScope = result.businessScope;
              this.address = result.address;
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
