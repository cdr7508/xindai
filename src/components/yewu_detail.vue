<template>
  <div>
    <v-topbarback text="业务详情"></v-topbarback>
    <div class="content text-left">
      <div class="bg-fff">
        <div class="fill-blank"></div>
        <router-link :to="{name:'yd_detail',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_1.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">业务详情</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <div v-if="$route.params.type == 1">
          <router-link :to="{name:'yd_kehuziliao_qy',params:{'custId':$route.params.custId}}">
            <p class="m-15"><img src="../assets/business_2.svg" class="pi-img2">
              <span class="ml-15 c-3d fz-16">客户资料</span>
              <img src="../assets/next.svg" class="fl-r right-arrow mr5">
            </p>
          </router-link>
        </div>
        <div v-if="$route.params.type == 2">
        <router-link :to="{name:'yd_kehuziliao',params:{'custId':$route.params.custId}}">
          <p class="m-15"><img src="../assets/business_2.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">客户资料</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        </div>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_danbaocuoshi',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_3.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">担保措施</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_fujianqindan',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_4.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">附件清单</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'shenpijilu',params:{'objectNo':$route.params.busiId,'modelNo':'business'}}">
          <p class="m-15"><img src="../assets/business_5.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">贷款审批记录</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_seehetong',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_6.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">查看合同</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'shenpijilu',params:{'objectNo':$route.params.busiId,'modelNo':'microPrint'}}">
          <p class="m-15"><img src="../assets/business_7.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">合同用印审批记录</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_quanzhengqindan',params:{'busiId':$route.params.busiId,'name':$route.params.name}}">
          <p class="m-15"><img src="../assets/business_8.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">权证清单</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link :to="{name:'shenpijilu',params:{'objectNo':busiid,'modelNo':'inStorage','title':'权证入库记录'}}">-->
          <!--<p class="m-15"><img src="../assets/business_9.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">权证入库记录</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_chuzhangjilu',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_10.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">出账记录</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link to="/yd_daihoujianchabd">-->
          <!--<p class="m-15"><img src="../assets/business_11.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">贷后检查表单</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link :to="{name:'shenpijilu',params:{'objectNo':busiid,'modelNo':'afterCheck','title':'贷后检查审批记录'}}">-->
          <!--<p class="m-15"><img src="../assets/business_12.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">贷后检查审批记录</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_wujifenlei',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_13.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">五级分类</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link :to="{name:'shenpijilu',params:{'objectNo':busiid,'modelNo':'classification','title':'五级分类审批记录'}}">-->
          <!--<p class="m-15"><img src="../assets/business_14.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">五级分类审批记录</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'yd_huankuanqingkuang',params:{'busiId':$route.params.busiId}}">
          <p class="m-15"><img src="../assets/business_15.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">还款情况</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <div class="bd-line mlr-15"></div>
        <router-link :to="{name:'shenpijilu',params:{'objectNo':$route.params.busiId,'modelNo':'outStorage'}}">
          <p class="m-15"><img src="../assets/business_16.svg" class="pi-img2">
            <span class="ml-15 c-3d fz-16">解押出库审批记录</span>
            <img src="../assets/next.svg" class="fl-r right-arrow mr5">
          </p>
        </router-link>
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link :to="{name:'yd_danganjiechuxq',params:{'busiId':$route.params.busiId}}">-->
          <!--<p class="m-15"><img src="../assets/business_17.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">档案借出详情</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<div class="bd-line mlr-15"></div>-->
        <!--<router-link :to="{name:'shenpijilu',params:{'objectNo':busiid,'modelNo':'lender','title':'档案借出审批记录'}}">-->
          <!--<p class="m-15"><img src="../assets/business_18.svg" class="pi-img2">-->
            <!--<span class="ml-15 c-3d fz-16">档案借出审批记录</span>-->
            <!--<img src="../assets/next.svg" class="fl-r right-arrow mr5">-->
          <!--</p>-->
        <!--</router-link>-->
        <div class="fill-blank"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  export default {
    name: 'yewu_detail',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
      };
    }
  }
</script>


<style scoped>
</style>
