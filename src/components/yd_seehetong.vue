<template>

  <div>
    <v-topbarback text="查看合同"></v-topbarback>
    <div class="content text-left">
      <div class="list-block">
        <ul>
          <li v-for="item in list">
            <router-link :to="{name:'ydht_sort',params:{'busiId':item.busiId,'contractType':item.contractType,'contractId':item.contractId}}">
               <div class="item-content" >
              <div class="item-inner">
                <div class="item-title fz-16">{{item.describe}}</div>
                <div class="item-after fz-14"><span class="color-primary">{{item.contractNo}}</span></div>
              </div>
            </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
//  import axios from '@/config/http'
  import config from '@/config/config'
  import check from '@/util/check'
  export default {
    name: 'yd_seehetong',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        busiId:this.$route.params.busiId,
        list:[]

      };
    },
    mounted(){
      this.getHetongList();
    },
    methods: {
      getHetongList(){
        this.$http.post(config.baseUrl + '/app/makeContractInit.do', {
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
          if(this.list.length<=0){
            layer.open({
              content:'暂无数据',
              btn:['知道了'],

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
  .list-block{
    margin:.75rem 0;
    font-size:.85rem;
  }
  .list-block .item-title{
    min-width:30%;
    color: #3d3d3d;
  }
  .list-block .item-after{
    max-width:65%;
    overflow:hidden;
    text-overflow:ellipsis;
    display:inline-block;
  }
  .list-block ul:before{
    display:none;
  }
  .list-block ul:after{
    display:none;
  }
  .list-block .item-content{
    padding-left:0;
  }
  .list-block .item-inner{
    padding-left:.75rem;
  }
</style>
