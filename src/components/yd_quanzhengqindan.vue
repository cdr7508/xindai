<template>

  <div>
    <v-topbarback text="权证清单"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff mt-15 mb-15" v-if="list.length > 0" v-for="item in list">
        <div class="agreen-shenpi width-40 pdl-15 c-3d">客户名称</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{item.pledgor}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">权证名称</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{item.archives_type_name}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">编号</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{item.rightNo}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">状态</div>

        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80 fc" v-if="item.statusName=='未入库'">{{item.statusName}}</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80"  v-if="item.statusName=='已入库'">{{item.statusName}}</div>

        <div class="clearfix"></div>
      </div>
      <div class="text-center no-list fz-16" v-if="list.length <= 0">暂无数据</div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  //  import axios from '@/config/http'
  import config from '@/config/config'
  import check from '@/util/check'
  export default {
    name: 'yd_quanzhengqindan',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId: this.$route.params.busiId,
        name: this.$route.params.name,
        list: []
      };
    },
    mounted(){
      this.getQuanzhengList();
    },
    methods: {
      getQuanzhengList(){

        this.$http.post(config.baseUrl + '/app/queryBusinessStorageList.do', {
          'busiId': this.busiId,
          'name': this.name
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.replace({ path: '/login/go' })
            }
          if (response.data.statusCode == 200) {
            var result = response.data;
            this.list = result.list;
//            if (this.list.length <= 0) {
//              layer.open({
//                content: '暂无数据',
//                btn: ['知道了'],
//
//              })
//              this.$router.go(-1);
//            }
          }
        }, function (err) {
            this.$router.replace({ path: '/login/go' })
        });


      }
    }
  }
</script>


<style scoped>
  .no-list {
    width: 100%;
    height: 90vh;
    background-color: #fff;
    line-height: 90vh;
    font-size: .7rem;
    margin-bottom: 3rem;
  }
  .fc{color: #f00;}
</style>
