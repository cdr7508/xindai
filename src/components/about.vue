<template>
  <div>
    <v-topbarback text="关于我们"></v-topbarback>
    <div class="content">
      <div class="clearfix text-center mt-30">
        <img class="icon-img" src="../assets/logo1.png" >
      </div>
      <div class="clearfix text-center mt-15">
        <img class="icon-img2" src="../assets/logo2.svg">
      </div>
      <div class="bg-fff intoduce mlrtb text-left pd-15">
            <p>安徽新安金融集团信贷综合业务系统移动端，该系统主要有流程审批、附件上传、查找业务/客户信息，以及贷后催收提醒等功能。1.0版本上线时间2017年8月。</p>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'

  export default {
    components : {
      'v-topbarback' : topbarback
    },
    data(){
      return {
      };
    }
  }

</script>


<style scoped>

  .intoduce{
    width: 100%;
    height: 38%;
  }

  .mlrtb{
    margin: 1.5rem 0;
  }

  .intoduce p{
    text-indent: 1.6rem;
    font-size: .8rem;
    color: #808080;
  }



</style>
