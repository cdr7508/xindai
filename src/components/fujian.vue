<template>
  <div class="page-group">
    <div class="page page-current">
      <v-topbarback text="附件清单"></v-topbarback>
      <!-- 这里是页面内容区 -->
      <div class="content bgf text-left">
        <div class="fill-blank"></div>
        <div class="m0-15">
          <div class="ftitle clearfix">
            <div class="pull-left">贷后检查资料</div>
            <div class="pull-right color-primary">上传人：张三</div>
          </div>
          <div class="text-center fj-time">2017-07-19 12:09:12</div>
          <ul class="fj-pic">
            <li>
              <img src="images/operation_1.svg" alt="">
            </li>
            <li>
              <img src="images/operation_1.svg" alt="">
            </li>
            <li>
              <img src="images/operation_1.svg" alt="">
            </li><li>
            <img src="images/operation_1.svg" alt="">
          </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
  import topbarback from '@/components/topbarback/topbarback'
  export default{
    components : {
      'v-topbarback' : topbarback
    },
  }
</script>
<style>
  .m0-15{
    margin:0 .75rem;
  }
  .ftitle{
    height:2.2rem;
    line-height:2.2;
    border-bottom:1px solid #e5e5e5;
  }
  .fj-time{
    font-size:.6rem;
    padding:.5rem;
    color:#a0a0a0;
  }
  .fj-pic{
    width:100%;
    margin-right:2%;
    background-color:#0ff;
  }
  .fj-pic li{
    float:left;
    width:48%;
    height:0;
    padding-top:48%;
    margin-right:4%;
    background-color:#ddd;
    position:relative;
    margin-bottom:4%;
  }
  .fj-pic li:nth-child(even){
    background-color:blue;
    margin-right:0;
  }
  .fj-pic li img{
    position:absolute;
    left: 0;
    top: 0;
    width:100%;
  }
</style>
