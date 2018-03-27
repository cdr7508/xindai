<template>

  <div>
    <v-topbarback text="担保措施"></v-topbarback>
    <div class="content text-left" v-if="list.length>0">
      <div class="bg-fff mt-15" v-for="item in list">
        <div class="agreen-shenpi width-40 pdl-15 c-3d">担保措施</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="item.classType == 1">担保</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="item.classType == 2">反担保</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">类别</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="item.guaranteeType == 1">保证</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="item.guaranteeType == 2">抵押</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-30 pdl-15 c-3d">客户名称</div>
        <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{item.name}}</div>
        <div class="clearfix"></div>
        <div class="fill-line"></div>
        <div class="agreen-shenpi width-40 pdl-15 c-3d">担保物类型</div>
        <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{item.assetName}}</div>
        <div class="clearfix"></div>
        <div v-if="item.guaranteeType == 2">
          <div class="fill-line"></div>
          <router-link
            :to="{path:'/yd_danbaocuoshi_detail/',query:{'classType':item.classType,'guaranteeType':item.guaranteeType,'name':item.name,'assetName':item.assetName,'owner':item.owner,'address':item.address,'area':item.area,'Evaluation':item.Evaluation,'amount':item.amount}}">
            <div class="pd-15 text-center fz-16 c-blue">查看</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import check from '@/util/check'
  import config from '@/config/config'
  export default {
    name: 'yd_danbaocuoshi',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId: this.$route.params.busiId,
        list: [],
        items: {}

      };
    },
    mounted(){
      this.getDanbaoList();
    },
    methods: {
      getDanbaoList(){

        this.$http.post(config.baseUrl + '/app/busiGuaranteeQryInit.do', {
          'busiId': this.busiId
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
            if(response.data.code ==1001){
                this.$router.push({ path: '/login' })
            }
          if (response.data.statusCode == 200) {
            var result = response.data;
            this.list = result.list;
            if (this.list.length <= 0) {
              layer.open({
                content: '暂无数据',
                btn: ['知道了'],

              })
              this.$router.go(-1);
            }
          }
        }, function (err) {
            this.$router.replace({ path: '/login/go' })
        });

      },

    }
  }
</script>
<style scoped>
</style>
