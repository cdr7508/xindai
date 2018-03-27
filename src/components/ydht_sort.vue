<template>
  <div>
    <!--<div>{{$route.params.modelname}}</div>-->
    <component :is="view" :params="$route.params"></component>

  </div>
</template>
<script>

  import topbarback from '@/components/topbarback/topbarback'

  import yd_seehetong_detail from '@/components/yd_seehetong_detail'
  import yd_seehetong_detail2 from '@/components/yd_seehetong_detail2'
  import yd_seehetong_detail3 from '@/components/yd_seehetong_detail3'
  import yd_seehetong_detail4 from '@/components/yd_seehetong_detail4'
  import yd_seehetong_detail5 from '@/components/yd_seehetong_detail5'
  import yd_seehetong_detail6 from '@/components/yd_seehetong_detail6'
  import yd_seehetong_detail7 from '@/components/yd_seehetong_detail7'

  export default {
    components: {
      'v-topbarback': topbarback,
      yd_seehetong_detail,
      yd_seehetong_detail2,
      yd_seehetong_detail3,
      yd_seehetong_detail4,
      yd_seehetong_detail5,
      yd_seehetong_detail6,
      yd_seehetong_detail7,
    },
    data(){
      return {
        currentView: this.checkCopm(this.$route.params.contractType),
      }
    },
    methods: {
      checkCopm(ss){
        switch (ss) {
          case '1':
            this.view = 'yd_seehetong_detail'
            break;
          case '2':
            this.view = 'yd_seehetong_detail2'
            break;
          case '3':
            this.view = 'yd_seehetong_detail3'
            break;
          case '4':
            this.view = 'yd_seehetong_detail4'
            break;
          case '5':
            this.view = 'yd_seehetong_detail5'
            break;
          case '6':
            this.view = 'yd_seehetong_detail6'
            break;
          case '7':
            this.view = 'yd_seehetong_detail7'
            break;
          case '8':
            this.view = 'yd_seehetong_detail5'
            break;
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
