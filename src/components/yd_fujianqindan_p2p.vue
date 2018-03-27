<template>

  <div>
    <v-topbarback text="附件清单"></v-topbarback>
    <div class="content">

      <ul class="fj-list">
        <scroller style="top: 0px"
                  :on-refresh="refresh">
          <li v-for="item in list">
            <div class="fj-title bdb">{{item.archives_type_name}}</div>
            <div class="fj-con">
              <div v-if="item.attachment!='' && item.attachment!='null'" >
                <div v-if="isImg(item.attachment)">
                  <!--<router-link :to="{path: '/fjdetail/', query: {  'imgsrc':picUrl+item.attachment,'realName': item.realName,'publishTime': item.publishTime}}">-->
                  <img :src="picUrl+item.attachment" @click="toImgView($event)" :realName="item.realName" :publishTime="item.publishTime">
                  <!--</router-link>-->
                </div>
                <div v-if="isVideo(item.attachment)">
                  <router-link :to="{name: 'videoview', params: {  'videosrc':picUrl+item.attachment,'name':item.archives_type_name }}"> <img src="/static/vedio.jpg"> </router-link>
                </div>
                <div v-if="isFile(item.attachment)" class="isfile">
                  <a :href="picUrl+item.attachment+last" >
                    {{item.attachment | filename}}
                  </a>
              </div>
            </div>
            </div>
          </li>
        </scroller>
      </ul>
    </div>
    <!--<yd_fujianqindan_detail :obj="datas" ref="aaa"></yd_fujianqindan_detail>-->
  </div>

</template>

<script>
  import topbarback from '@/components/topbarback/topbarback'
  import yd_fujianqindan_detail from "@/components/yd_fujianqindan_detail";
  import config from '@/config/config'
  import check from '@/util/check'
  import getuser from '@/util/getuser'
  import Vue from 'vue'
  import VueScroller from 'vue-scroller'
  Vue.use(VueScroller)
  export default {
    name: 'yd_fujianqindan',
    components: {
      'v-topbarback': topbarback,
      'yd_fujianqindan_detail': yd_fujianqindan_detail,
    },
    data(){
      return {
          picUrl:config.baseUrl+'/',
          list: [],
          //dataList:[],
          datas:{},
          last:'?type=file'
      };
    },
    mounted(){
      this.getFujianList();
    },
    methods: {
      toImgView(event){
        var img = event.currentTarget;
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var imgSrc = img.src
        var realName = img.getAttribute('realName')
        var publishTime = img.getAttribute('publishTime')

        this.$router.push({ path: '/fjdetail/', query: {  'imgsrc':imgSrc,'realName':realName,'publishTime':publishTime ,'width':w,'height':h}})
      },
      isImg(url){
        var re = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/
        if(re.test(url)){
          return true;
        }
      },
      isVideo(url){
        var re = /\.(mp4)$/
        if(re.test(url)){
          return true;
        }
      },
      isFile(url){
        var re = /\.(doc|txt|docx|pdf|xls|xlsx)$/
        if(re.test(url)){
          return true;
        }
      },
      parentCall(item){
        this.datas = item
        this.$refs.aaa.show()
      },

      refresh (done) {
        this.list.length = 0;
        this.getFujianList();
        done()
      },
      // infinite(done) {
      //     this.pageNum++;
      //     setTimeout(() => {
      //         if (this.list.length <1) {
      //             done(true)
      //             return;
      //         }else{
      //             this.getFujianList()
      //             done()
      //         }

      //     }, 1500)
      // },
      getFujianList(){
          this.$http.post(config.baseUrl+'/app/archivePrintDealnew.do', {
              'id': getuser().id,
              'objectNo': this.$route.params.objectNo,
              'nodeno': this.$route.params.nodeno,
              'modelNo': this.$route.params.modelNo,
              'status': this.$route.params.status
          }, {
              headers: {
              },
              emulateJSON: true
          }).then(function(response) {
              //this.processUserList = response.data.processUserList;
              this.list = response.data.list;          
          }, function(err) {
              console.log(err);
              this.$router.replace({ path: '/login/go' })

          });


      },

    },
    filters: {
      filename: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.substring(value.lastIndexOf('/')+1)
      }
    }
  }
</script>


<style scoped>
  .fj-list li {
    background-color: #fff;
    margin-top: .75rem;
    padding: 0 .75rem;
  }

  .fj-title {
    font-size: .8rem;
    padding: .5rem;
  }

  .fj-con {
    padding: .8rem 0;
  }
  /*.fj-con>div{*/
    /*height:0;*/
    /*width:50%;*/
    /*position:relative;*/
    /*padding-top:50%;*/
    /*display:block;*/
    /*margin:0 auto;*/
  /*}*/
  /*.fj-list>div img {*/
    /*position:absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  .fj-list>div img {
    max-width: 6rem;
    max-height:6rem;
  }
  .isfile{
    height:4rem;
    padding:1rem 0;
    line-height:2;
  }
</style>
