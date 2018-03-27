<template>

  <div>
    <v-topbarback text="档案借出详情"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff">
        <!--<div>{{$route.params.objectNo}}</div>-->
        <div class="fill-blank"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">申请人</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{enterName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">申请时间</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{enterTime}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">借出原因</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{cause}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">预计归还日期</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{plantime}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <!--<div class="agreen-shenpi width-40 pdl-15 c-3d">借出日期</div>-->
        <!--<div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{operateTime}}</div>-->
        <!--<div class="clearfix"></div>-->
        <!--<div class="fill-line"></div>-->
        <div class="agreen-shenpi width-40 pdl-15 c-3d">归还日期</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{returntime}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">当前状态</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{statusName}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <!--<div class="pdtlr-15 c-3d" v-for="item in list">-->
          <!--申请借出档案(名称+编号)-->
          <!--<p>{{item.archives_type_name}}</p>-->
          <!--<p></p>-->
        <!--</div>-->
        <div  v-if="list.length > 0">
        <div class="list-item" v-for="item in list">
          <div> {{item.archives_type_name}}</div>
          <div><span class="fl">{{item.rightNo}}</span>
          <span class="fr">{{item.statusName}}</span>
          </div>
          <!--<v-select :items="options" ref="select"></v-select>-->
        </div>
        </div>
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
    name: 'yd_danganjiechuxq',
    components: {
      'v-topbarback': topbarback
//      'v-select': select
    },
    data(){
      return {
          objectNo:this.$route.params.objectNo,
        enterName:'',
        enterTime:'',
        archives_type_name:'',
        archiveid:'',
        cause:'',
        plantime:'',
        operateTime:'',
        returntime:'',
        statusName:'',
        list:[]
//        options:[]
      };
    },
    mounted(){
     this.getDangan()
    },
    methods:{
      getDangan(){
          this.$http.post(config.baseUrl + '/app/queryBusinessStorageDetailList.do', {
              'objectNo':this.objectNo
          }, {
              headers: {},
              emulateJSON: true
          }).then(function (response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              if(response.data.statusCode==200){
                  var result = response.data.data;
                  console.log(result);
                  this.list = result.list;
                  this.enterName = result.info.enterName;
                  this.enterTime = result.info.enterTime;
                  this.cause = result.info.cause;
                  this.plantime = result.info.plantime;
                  this.operateTime = result.info.operateTime;
                  this.returntime = result.info.returntime;
                  this.statusName = result.info.statusName;

              }
          }, function (err) {
              this.$router.replace({ path: '/login/go' })
          });


      }
    }
  }
</script>
<style scoped>
  .pdlr-15{
    padding: 0 0.75rem;
  }
  /*.mr-30{*/
    /*margin-right: 1.5rem;*/
  /*}*/
  .pdtlr-15{
    padding: .75rem .75rem 0;
  }
  .m-5{
    padding:.5rem .5rem 0;
  }
  .mt-5{
    margin-top: .5rem;
  }
  .list-item{
    padding:.8rem;
    margin:0 1.5rem;
    border-bottom:1px solid #ddd;
    overflow:hidden;
  }
  .list-item>div{
     line-height:1.8;
  }  .list-item>div:last-child{
    padding-bottom:.8rem;
  }
  .list-item .fl{
    float:left;
    width:80%;
  }
</style>
