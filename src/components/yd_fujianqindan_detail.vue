<template>
  <div>
    <!--<header class="bar bar-nav top-bar">-->
      <!--<span class="goback" @click="show"></span>-->
      <!--<h1 class="title">附件清单</h1>-->
    <!--</header>-->
    <v-topbarback text="附件清单"></v-topbarback>
    <div class="content bgf">
      <!--<div>{{$route.query}}</div>-->
      <div class="fill-blank"></div>
      <div class="m0-15">
         <div class="ftitle clearfix">
           <!--<div class="pull-left">{{obj.archives_type_name}}</div>-->
           <div class="pull-right color-primary">上传人：{{$route.query.realName}}</div>
         </div>
         <div class="text-center fj-time">{{$route.query.publishTime | formatDate}}</div>
         <ul class="fj-pic">
           <li>
             <!--<img :src="picUrl+obj.attachment">-->
             <div>
             <div class="preview-img-list">
               <img class="preview-img-item" v-for="(item, index) in items"
                 :src="item.src" @click="$photoswipe.open(index, items)">
             </div>
             </div>
           </li>
         </ul>

        <div class="fj-tip">（点击可放大查看）</div>
      </div>
    </div>
  </div>

</template>
<script>
  import topbarback from '@/components/topbarback/topbarback'
  import {formatDate} from '@/util/util.js';
  import config from '@/config/config'

  export default {
    name: 'yd_fujianqindan_detail',
    components: {
      'v-topbarback': topbarback
    },
    props: {
      obj: Object
    },
    data(){
      return {
          picUrl:config.baseUrl+'/',
        showToggle: false,
        newArr:[],
        items:[{
          src:this.$route.query.imgsrc,
          w: this.$route.query.width,
          h: this.$route.query.height
        }]
      };
    },
    methods: {
      show(){
        this.showToggle = !this.showToggle;
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time/1000);
        return formatDate(date);
      }
    }
  }
</script>


<style scoped>
  .m0-15 {
    margin: 0 .75rem;
  }

  .ftitle {
    height: 2.2rem;
    line-height: 2.2;
    border-bottom: 1px solid #e5e5e5;
  }

  .fj-time {
    font-size: .6rem;
    padding: .5rem;
    color: #a0a0a0;
  }

  .fj-pic {
    width: 100%;
    margin: 0 auto;
  }
  .fj-pic img{
      width:100%;
  }
  .fj-tip {
    font-size: .7rem;
    text-align: right;
    color: #808080;
  }

  .goback{
    position:absolute;
    left:0;
    top:0;
    width:2.2rem;
    height:100%;
    background:url(../components/topbarback/return.svg) 10px center no-repeat;
    background-size:.6rem;
    z-index:100;
  }
  .top-bar{
    height:3.2rem;
  }
  .top-bar .title{
    line-height:3.2rem;
    color:#fff;
  }

  .preview-img-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:center;
  }
  .preview-img-item {
    margin: 5px;
    width: 100%;

  }
</style>
