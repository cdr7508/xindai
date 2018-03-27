<template>
  <div>
    <v-topbarback text="审批"></v-topbarback>
    <v-footer></v-footer>
    <div class="content bgf">
      <ul class="menu-tab">
        <li><router-link to="/shenpi/weishenpi"><span>待我审批</span></router-link></li>
        <li><router-link to="/shenpi/yishenpi"><span>我已审批</span></router-link></li>
      </ul>
    </div>
    <div class="list-con">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </div>

  </div>
</template>

<script>
import Footbar from '@/components/footbar/FootBar'
import topbarback from '@/components/topbarback/topbarback'
export default {
  name: 'task',
  components: {
    'v-topbarback':topbarback,
      'v-footer' : Footbar,
  },
    data(){
      return {

        };

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .list-con{
    background: #fff;
    position: absolute;
    top:6.2rem;
    right: 0;
    bottom: 3rem;
    left: 0;
    padding:0; margin:0;
    overflow: auto;
    z-index:20;
    -webkit-overflow-scrolling: touch;
  }
  .router-link-exact-active.router-link-active span{
    border-bottom:2px solid #29b6f6;
    color:#29b6f6;
  }
</style>
