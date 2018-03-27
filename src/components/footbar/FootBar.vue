<template>
    <nav class="foot-bar">
        <router-link to="/home/task">
            <div class="foot-item">
                <i class="ico icon-task"></i><span class="foot-txt">任务</span>
                <span class="tip-num" v-if="unhandledNum>0">{{unhandledNum}}</span>
            </div>
        </router-link>
        <router-link to="/home/opration">
            <div class="foot-item ">
                <i class="ico icon-opration"></i> <span class="foot-txt">操作</span>
            </div>
        </router-link>
        <router-link to="/home/query">
            <div class="foot-item ">
                <i class="ico icon-query"></i> <span class="foot-txt">查询</span>
            </div>
        </router-link>
        <router-link to="/home/warning">
            <div class="foot-item ">
                <i class="ico icon-warning"></i> <span class="foot-txt">预警</span>
                <span class="tip-num" v-if="warnNum>0" >{{warnNum | formatNumber}}</span>
          </div>
        </router-link>
    </nav>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name : 'footbar',
          data () {
            return {
//              warnNum:1,
//              unhandledNum:1,
            }
          },
      computed:{
        warnNum(){
            return this.$store.state.warnNum;
        },
        unhandledNum(){
            return this.$store.state.unhandledNum;
        },
      },
     filters : {
         formatNumber(value) {
            if(value>100){
                return '99+';
            }else{
                return value;
            }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .router-link-exact-active.router-link-active{

    }
    .foot-bar{
        bottom:0;
        width:100%;
        height:2.5rem;
        padding:0;
        table-layout:fixed;
        position:absolute;
        right:0;
        left:0;
        z-index:10;
        background:#ffffff;
        box-shadow:0 -1px 0 0 rgba(0, 0, 0, 0.10);
    }
    .foot-item{
        position:relative;
        width:25%;
        float:left;
        height:2.5rem;
        color:#3d3d3d;
        text-align:center;
        vertical-align:middle;
        padding-top:.4rem;
        font-size:0;
    }
    .router-link-exact-active.router-link-active .foot-txt{
        color:#29b6f6;
    }
    .foot-item .ico{
        width:1.6rem;
        height:1rem;
        display:inline-block
    }
    .icon-task{
        background:url(task_1.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .icon-query{
        background:url(query_1.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .icon-opration{
        background:url(operation_1.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .icon-warning{
        background:url(warn_1.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .foot-txt{
        font-size:.6rem;
        color:#3d3d3d;
        display:block;
        text-align:center;
    }
    .router-link-exact-active.router-link-active .icon-task{
        background:url(task_2.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .router-link-exact-active.router-link-active .icon-query{
        background:url(query_2.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .router-link-exact-active.router-link-active .icon-opration{
        background:url(operation_2.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .router-link-exact-active.router-link-active .icon-warning{
        background:url(warn_2.svg) 0 0 no-repeat;
        background-size:100% 100%;
    }
    .foot-item .tip-num{
        position:absolute;
        top:.3rem;
        left:54%;
        width:.85rem;
        height:.85rem;
        border-radius:100%;
        background:#ff2244;
        color:#fff;
        font-size:.5rem;
        line-height:.9rem;
        text-align:center;
    }

</style>
