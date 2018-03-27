<template>
  <div class="page-group">
    <div class="page page-current">
      <v-topbarback text="上传附件"></v-topbarback>
      <!-- 这里是页面内容区 -->
      <div class="content text-left">
        <!--<div>{{$route.params}}</div>-->
        <div class="otitle"><img src="../assets/operation_enclosure.svg" class="img">{{$route.params.title}}</div>

        <div class="up-wrap" v-for="(item,index) in list">
          <div class="uptitle bdb"><img src="../assets/operation_Property.svg" class="icon">{{item.archives_type_name}}</div>
          <div class="pic-box bgf">
            <!--图片-->

            <div v-if="item.attachment!='' && item.attachment!='null'">

              <div class="img-box" v-if="isImg(item.attachment)">
            <span class="img-wrap">
               <!--<router-link :to="{name: 'imgview', params: {  'imgsrc':picUrl+item.attachment,'name':item.archives_type_name }}">-->
               <img :src="picUrl+item.attachment" @click="toImgView($event)" :name="item.archives_type_name">
              <!--</router-link>&ndash;&gt;-->
              <span class="del-img" @click="delImg(item)">×</span>
            </span>

              </div>
            </div>

            <!--视频-->
            <div class="img-box" v-if="isVideo(item.attachment)">
            <span class="img-wrap">
              <router-link :to="{name: 'videoview', params: {  'videosrc':picUrl+item.attachment,'name':item.archives_type_name }}"> <img src="/static/vedio.jpg"> </router-link>
              <span class="del-img" @click="delImg(item)">×</span>
            </span>
            </div>
            <!--文件-->
            <div class="img-box" v-if="isFile(item.attachment)">
            <span class="img-wrap">
              <a :href="picUrl+item.attachment+last">
                {{item.attachment | filename}}
              </a>
              <span class="del-img" @click="delImg(item)">×</span>
            </span>
            </div>
            <span class="upfile">
            <input type="file" v-on:change="upfile($event,item)" class="upfileinput">
            <img src="../assets/operation_upload.svg">
          </span>
          </div>
        </div>
      </div>

      <div class="loading-box" v-show="uptrue">
        <div class="loading"><img src="../assets/loading.gif"><span>上传中</span></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

  import topbarback from '@/components/topbarback/topbarback'
  import imgview from '@/components/imgview'
  import config from '@/config/config'
  import check from '@/util/check'
  import getuser from '@/util/getuser'


  export default {
    name: 'uploadFile',
    components: {
      'v-topbarback': topbarback
    },
    data(){
      return {
        list: [],
        picUrl: config.baseUrl + '/',
        imgsrc: '',
        uptrue: false,
        custId: this.$route.params.custId,
        last: '?type=file'
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      isImg(url){
        var re = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG|svg)$/
        if (re.test(url)) {
          return true;
        }
      },
      isVideo(url){
        var re = /\.(mp4|MOV|mov)$/
        if (re.test(url)) {
          return true;
        }
      },
      isFile(url){
        var re = /\.(doc|txt|docx|pdf|xls|xlsx)$/
        if (re.test(url)) {
          return true;
        }
      },
      delImg(item){
        var _this = this;

        this.$http.post(config.baseUrl + '/app/archiveDelete.do', {
          'ids': item.id,
          'userId': getuser().id,
          'busiId': this.$route.params.busiId
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
          console.log(response);
          if (response.data.code == 1001) {
            this.$router.replace({path: '/login/go'})
          }
          if (response.data.statusCode == 200) {
            layer.open({
              content: '删除成功',
              btn: ['知道了'],
              yes: function (index) {
                _this.getData()
                layer.close(index)
              }
            })
          } else {
            layer.open({
              content: response.data.message,
              btn: ['知道了'],
            })
          }


        }, function (err) {
          this.$router.replace({path: '/login/go'})
        });

      },
      toImgView(event){
        var img = event.currentTarget;
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var imgSrc = img.src
        var name = img.name
        this.$router.push({ path: '/imgview/', query: {  'imgsrc':imgSrc,'name':name, 'width':w,'height':h}})
      },
      getData(){
        this.$http.post(config.baseUrl + '/app/queryArchive_App.do', {
          'busiId': this.$route.params.busiId
        }, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
          if (response.data.code == 1001) {
            this.$router.replace({path: '/login/go'})
          }
          this.list = response.data.list;

        }, function (err) {
          this.$router.replace({path: '/login/go'})
        });

      },
      getXHR(){
        var xhr = null;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
          try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
          } catch (e) {
            try {
              xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
              alert("您的浏览器暂不支持Ajax!");
            }
          }
        }
        return xhr;
      },
      upfile(event, item){
        var userinfo = getuser();
        this.uptrue = true;
        var files = event.target.files;
        let file = event.target.files[0];
        let formData = new FormData(); //创建form对象
        formData.append('file', file, file.name);//通过append向form对象添加数据

        formData.append('levelOne', item.archives_type_parent);
        formData.append('levelTwo', item.archives_type_id);
        formData.append('custId', this.custId);
        formData.append('content', '');
        formData.append('projectId', item.busiId_query);
        formData.append('belongOne', '');
        formData.append('belongTwo', '');
        formData.append('userId', userinfo.id);
        console.log(formData);
        var xhr = this.getXHR();
        console.log(xhr);
        xhr.open("POST", config.baseUrl + '/app/dealLotPictureUpload.do', formData, true);
        var _this = this
        // 发送表单数据
        xhr.send(formData);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              console.log(xhr.responseText);
              var res = JSON.parse(xhr.responseText)
              if (res.statusCode == 200) {
                _this.uptrue = false;
                layer.open({
                  content: '上传成功',
                  btn: ['知道了'],
                  yes: function (index) {
                    _this.getData()
                    layer.close(index);
                  }
                })
              } else {
                layer.open({
                  content: '上传失败',
                  btn: ['知道了']
                })
              }

            } else {
              _this.uptrue = false;
              console.log(xhr.status);
              layer.open({
                content: '上传失败',
                btn: ['知道了']
              })
            }
          }
        }
      },
    },
    filters: {
      filename: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.substring(value.lastIndexOf('/') + 1)
      }
    }
  }
</script>
<style scoped>
  .upfile{
    display:inline-block;
    width:3.5rem;
    height:3.5rem;
    position:relative;
  }
  .upfile input{
    position:absolute;
    left:0;
    top:0;
    z-index:99;
    width:100%;
    height:100%;
    opacity:0;
  }
  .upfile img{
    position:absolute;
    left:0;
    top:0;
    z-index:0;
    width:100%;
    height:100%;
    z-index:1;
  }
  .upimg{
    width:3.5rem;
    height:3.5rem;
    float:left;
    margin-right:.5rem;
  }
  .del-img{
    width:.8rem;
    height:.8rem;
    line-height:.8rem;
    display:inline-block;
    position:absolute;
    right:-.4rem;
    top:-.4rem;
    background-color:#f00;
    text-align:center;
    color:#fff;
    border-radius:100%;
  }
  .img-box{
    float:left;
  }
  .img-wrap{
    display:inline-block;
    width:3.5rem;
    height:3.5rem;
    float:left;
    margin-right:.5rem;
    position:relative;
  }
  .img-wrap img{
    width:100%;
    height:100%;
  }
  .img-wrap a{
    word-break:break-all;
    font-size:.5rem;
    line-height:1.2 !important;
  }
  .loading-box{
    position:fixed;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index:10000;
    background-color:rgba(0, 0, 0, 0.7);
  }
  .loading{
    width:120px;
    height:50px;
    line-height:50px;
    background-color:#fff;
    position:fixed;
    left:50%;
    top:50%;
    margin-left:-60px;
    margin-top:-25px;
    border-radius:5px;
    color:#333;
  }
  .loading img{
    width:32px;
    height:32px;
    vertical-align:middle;
    margin-right:10px;
  }
</style>
