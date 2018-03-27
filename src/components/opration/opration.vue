<template>
  <div>
      <div class="content">
        <v-header text="操作"></v-header>
        <scroller style="top: 60px"
                :on-refresh="refresh"
                :on-infinite="infinite">
          <div class="m10-0">
            <ul class="cz-list">
              <li class="cz-item" v-for="item in list"  >
                <router-link :to="{ name: 'uploadFile',params: { 'busiId': item.busiId,'title':item.title,'custId':item.custId }}">
                  <div class="cz-head"  >{{item.statusName}}</div>
                  <div class="cz-body">
                    <p>{{item.title}}</p>
                  </div>
                  <div class="cz-foot">提交日期：{{item.startTime}}</div>
                </router-link>
              </li>
            </ul>
          </div>
        </scroller>
      </div>

 </div>
</template>

<script>
  import topbar from '@/components/topbar/topbar'
  import config from '@/config/config'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  import check from '@/util/check'
  import getuser from '@/util/getuser'
  import {mapMutations} from 'vuex';
  Vue.use(VueScroller)
  export default {
    name : 'chaozuo',
    components : {
        'v-header' : topbar
    },
    data(){
      return {
        list:[],
        pageNum:0,
        pageSize:6,
      }
    },
    mounted(){
      this.fetchData(this.pageNum);
      this.top = 1
      this.bottom = 6
    },
    methods: {
        ...mapMutations(['modifyTip']),
      refresh(done) {
//        setTimeout(() => {
//          this.fetchData(0);
//          this.top = this.top - 10;
//          done()
//        }, 1500)
//        return;
          this.list.length=0;
          this.fetchData(1);
          done()
      },
      infinite(done) {
          this.pageNum++;
          setTimeout(() => {
              if (this.list.length <1) {
              done(true)
              return;
          }else{
              this.fetchData(this.pageNum)
              done()
          }

      }, 1500)

      },
      fetchData(page){
        console.log(page);
        var us = getuser();
          this.$http.post(config.baseUrl+'/app/unChuZhangList.do', {
              'id':us.id,
              'pageNum':page,
              'pageSize':this.pageSize,
          }, {
              headers: {
              },
              emulateJSON: true
          }).then(function(response) {
              if(response.data.code ==1001){
                  this.$router.replace({ path: '/login/go' })
              }
              this.list  = this.list.concat(response.data.list);

          }, function(err) {
              console.log(err);
              this.$router.replace({ path: '/login/go' })
          });

      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cz-list{
    text-align:left;
  }
  .cz-item{
    background-color:#fff;
    padding:.6rem .8rem;
    margin-bottom:.75rem;
  }
  .cz-head{
    font-size:.8rem;
    color:#3d3d3d;
    padding-bottom:.5rem;
  }
  .cz-foot{
    font-size:12px;
    color:#808080;
    padding-top:.4rem;
  }
  .cz-body{
    background:rgba(41, 182, 246, 0.10);
    border-radius:8px;
    background-image:url(operation_list.svg);
    background-repeat:no-repeat;
    background-position:1.1rem center;
    background-size:1.4rem;
    padding:.5rem 0; padding-left:3.5rem;
    text-align:left;
  }
  .cz-body h2{
    font-size:.8rem;
    color:#1094f9;
  }
  .cz-body p{
    font-size:.7rem;
    color:#29b6f6;
  }
</style>
