<template>
  <div>
    <v-topbarback text="贷后检查记录"></v-topbarback>
    <div class="content bgf">
      <ul class="djt-list" v-if="list.length > 0">
        <li v-for="item in list">
          <router-link :to="{name:'yd_daihoujianchajilu_detail',params:{'id':item.id}}">
          <div class="i-title">贷后检查日期：{{item.checkDate}}</div>
          <span class="show-detail">查看检查详情>></span>
          </router-link>
        </li>

      </ul>
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
        busiId:this.$route.params.busiId,
        list:[]
      };
    },
    mounted(){
      this.getDaihouCheckList();
    },
    methods: {
      getDaihouCheckList(){
          this.$http.post(config.baseUrl + '/app/queryAfterLoanCheck.do', {
              'busiId': this.busiId
          }, {
              headers: {},
              emulateJSON: true
          }).then(function (response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              var result = response.data;
              this.list = result.list;

              if(this.list.length<=0){
                  layer.open({
                      content:'暂无数据',
                      btn:['知道了'],

                  })
                  this.$router.go(-1);
              }
          }, function (err) {
              this.$router.replace({ path: '/login/go' })
          });

      },
    }
  }
</script>


<style scoped>

  .djt-list{
    padding:.85rem;
  }
  .djt-list li{
    margin-bottom:.5rem;
    min-height:3.2rem;
    padding-left:1rem;
    position:relative;
  }
  .djt-list li:before{
    content:'';
    position:absolute;
    left:-.6rem;
    top:-.1rem;
    width:.7rem;
    height:.7rem;
    border-radius:100%;
    background:#ffb41c;
    border:6px solid #fff;
    z-index:2;
  }
  .djt-list li:after{
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:0;
    height:100%;
    border-left:1px solid #cbcbcb;
    z-index:1;
  }
  .i-title{
    font-size:.8rem;
    color:#3d3d3d;
    margin-bottom:.3rem;
  }
  .show-detail{
    font-family: PingFangSC-Regular;
    font-size:16px;
    color:#6d9ee1;
  }

  .no-list{
    width:100%;
    height:90vh;
    background-color:#fff;
    line-height:90vh;
    font-size:.7rem;
    margin-bottom:3rem;
  }
</style>
