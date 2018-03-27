<template>

  <div>
    <v-topbarback text="五级分类"></v-topbarback>
    <div class="content text-left ">
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
      <div class="agreen-shenpi width-50 pdl-15 c-3d">贷款发放日</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{loanTime}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">当前余额</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="banlance >= 0">{{banlance}}元</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">担保方式</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{guaranteeName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">贷后检查人</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{afterLoanManageIdName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">本息逾期情况</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="overdue == 1">未逾期</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="overdue == 2">90天内</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="overdue == 3">91-180天</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="overdue == 4">180天以上</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-50 pdl-15 c-3d">经营层负责人</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{operateLeaderName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-45 pdl-15 c-3d">调查岗意见</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80">{{startAdvise}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-45 pdl-15 c-3d">初分分类结果</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_stage_initial == 1">正常</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_stage_initial == 2">关注</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_stage_initial == 3">次级</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_stage_initial == 4">可疑</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_stage_initial == 5">损失</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-45 pdl-15 c-3d">最终认定分类结果</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_state_final ==1">正常</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_state_final ==2">关注</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_state_final ==3">次级</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_state_final ==4">可疑</div>
      <div class="agreen-shenpi2 width-50 text-right pd-15 c-80" v-if="five_state_final ==5">损失</div>
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
    name: 'yd_wujifenlei',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId:this.$route.params.busiId,
        objectNo:this.$route.params.objectNo,
        name:'',
        busiName:'',
        loanTime:'',
        banlance:'',
        guaranteeName:'',
        afterLoanManageIdName:'',
        overdue:'',
        operateLeaderName:'',
        startAdvise:'',
        five_stage_initial:'',
        five_state_final:'',
      };
    },
    mounted(){
      this.getWujifenlei();
    },
    methods:{
      getWujifenlei(){
        if(this.busiId!=null){
            this.$http.post(config.baseUrl+'/app/queryBusinessFiveStateList.do', {
                'busiId':this.busiId,
                'objectNo':this.objectNo
            }, {
                headers: {
                },
                emulateJSON: true
            }).then(function(response) {
                if(response.data.code ==1001){
                    this.$router.replace({ path: '/login/go' })
                }
                if(response.data.statusCode==200){
                    var result = response.data.list;

                    this.name = result[0].name;
                    this.busiName = result[0].busiName;
                    this.loanTime = result[0].loanTime;
                    this.banlance = result[0].banlance;
                    this.guaranteeName = result[0].guaranteeName;
                    this.afterLoanManageIdName = result[0].afterLoanManageIdName;
                    this.overdue = result[0].overdue;
                    this.operateLeaderName = result[0].operateLeaderName;
                    this.startAdvise = result[0].startAdvise;
                    this.five_stage_initial = result[0].five_stage_initial;
                    this.five_state_final = result[0].five_state_final;
                }

            }, function(response) {
                this.$router.replace({ path: '/login/go' })
            });

        }else{
            layer.open({
                content:'缺少ID',
                btn:['知道了'],

            })
        }
      }
    },
  }
</script>


<style scoped>
  .no-list{
    width:100%;
    height:90vh;
    background-color:#fff;
    line-height:90vh;
    font-size:.7rem;
    margin-bottom:3rem;
  }
</style>
