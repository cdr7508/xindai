<template>
  <div>
    <v-topbarback text="担保措施"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff mt-15">
      <div class="agreen-shenpi width-40 pdl-15 c-3d">担保措施</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="classType==1">担保</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="classType==2">反担保</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">类别</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="guaranteeType == 1">保证</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80" v-if="guaranteeType == 2">抵押</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">客户名称</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{$route.query.name}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">担保物类型</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{$route.query.assetName}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">所有权人</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{$route.query.owner}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">坐落</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{$route.query.address}}</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-30 pdl-15 c-3d">面积</div>
      <div class="agreen-shenpi2 width-70 text-right pd-15 c-80">{{$route.query.area}}平方米</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">评估价格</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{$route.query.Evaluation}}元</div>
      <div class="clearfix"></div>
      <div class="fill-line"></div>
      <div class="agreen-shenpi width-40 pdl-15 c-3d">担保债权金额</div>
      <div class="agreen-shenpi2 width-60 text-right pd-15 c-80">{{$route.query.amount}}元</div>
      <div class="clearfix"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  export default {
    name: 'yd_danbaocuoshi_detail',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        classType: this.$route.query.classType,
        guaranteeType: this.$route.query.guaranteeType,
      }
    }
  }
</script>


<style scoped>
</style>
