<template>
  <div>
    <v-header text="预警"></v-header>
    <div class="content">
      <div class="m10-0">
        <router-link to="/warning_five">
          <div class="warn-div">
            <div class="warn-img">
              <img src="../assets/warn_c.svg">
            </div>
            <div class="warn-con">
              <span class="warn-next"><img src="../assets/next.svg" alt=""></span>
              <div class="warn-head">五日内应收利息</div>
              <div class="warn-text">共计<span class="warn-num">{{total}}</span>条</div>
            </div>
          </div>
        </router-link>

        <div class="fill-blank"></div>

        <router-link to="/warning_thirty">
          <div class="warn-div">
            <div class="warn-img">
              <img src="../assets/warn_b.svg">
            </div>
            <div class="warn-con">
              <span class="warn-next"><img src="../assets/next.svg" alt=""></span>
              <div class="warn-head">30日内到期本金</div>
              <div class="warn-text">共计<span class="warn-num">{{total2}}</span>条</div>
            </div>
          </div>
        </router-link>
        <div class="fill-blank"></div>

        <router-link to="/warning_over">
          <div class="warn-div">
          <div class="warn-img">
            <img src="../assets/warn_a.svg">
          </div>
          <div class="warn-con">
            <span class="warn-next"><img src="../assets/next.svg" alt=""></span>
            <div class="warn-head">逾期／欠息清单</div>
            <div class="warn-text">共计<span class="warn-num">{{total3}}</span>条</div>
          </div>
        </div>
        </router-link>
        <div class="loading" v-show="load">
          <div class="preloader"></div>
          <span class="vm">加载中...</span>
        </div>
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
  export default {
    name: 'home',
    components: {
      'v-footer': Footbar,
      'v-header': topbar
    },
    data(){
      return {
        user:getuser(),
        total:'',
        total2:'',
        total3:'',
        load:false
      };
    },
    mounted(){
        this.getWarnNum()
    },
    methods:{
        getWarnNum(){
            this.load=true;
            this.$http.post(config.baseUrl+'/app/warnNum.do', {
                'userId': getuser().id,
                'specPriv': getuser().specPriv
            }, {
                headers: {
                },
                emulateJSON: true
            }).then(function(response) {
                if(response.data.code ==1001){
                    this.$router.replace({ path: '/login/go' })
                }
                this.load=false;
                var result = response.data.data;
                this.total = result.total;
                this.total2 = result.total2;
                this.total3 = result.total3;

            }, function(err) {
                this.$router.replace({ path: '/login/go' })
            });

        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loading{
    position:fixed;
    z-index:9999;
    width:100%;
    left: 0;
    bottom:30%;
  }
  .loading div{vertical-align:middle;}
  .vm{ vertical-align:middle;}
</style>
