<template>
  <div>
    <v-topbarback text="附件详情"></v-topbarback>
    <div class="content bgf">
      <!--<div>{{$route.params}}</div>-->
      <div class="view-title">{{$route.query.name}}</div>
      <div class="preview-img-list" >
        <img class="preview-img-item" v-for="(item, index) in items"
                :src="item.src" @click="$photoswipe.open(index, items)" id="img">
      </div>
      <!--<div class="fj-tip">（点击可放大查看）</div>-->
    </div>

  </div>

</template>

<script>
    import topbarback from '@/components/topbarback/topbarback'
  export default {
      data(){
          return {
            items:[{
              src:this.$route.query.imgsrc,
              w: this.$route.query.width,
              h: this.$route.query.height
            }]
          };
      },
      components: {
          'v-topbarback': topbarback
      },

  }
</script>


<style scoped>
.view-title{
  width:100%;
  text-align:center;
  font-size:.8rem;
  text-align:center;
  padding:1rem;

}
  .preview-img-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:center;
  }
  .preview-img-item {
    width: 80%;
    /*max-height: 200px;*/
  }
  .fj-tip {
    font-size: .7rem;
    text-align: right;
    color: #808080;
  }
</style>
