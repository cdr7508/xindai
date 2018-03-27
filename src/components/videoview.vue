<template>
  <div>
    <v-topbarback text="视频"></v-topbarback>
    <div class="content bgf">
      <!--<div>{{$route.params}}</div>-->

          <video width="100%"  height="80%" autoplay @click="play($event)" ref="movie">
            <source :src="$route.params.videosrc" type="video/mp4" />
            你浏览器不支持 video 功能，点击 <a :href="$route.params.videosrc">下载视频</a>
          </video>
          <button type="button" @click="play" class="v-btn">播放</button>
          <button type="button" @click="stop" class="v-btn">停止</button>
    </div>

  </div>

</template>

<script>
    import topbarback from '@/components/topbarback/topbarback'

  export default {
      components: {
          'v-topbarback': topbarback
      },
      methods:{
          play(){
             this.$refs.movie.play()
          },
          stop(){
             this.$refs.movie.pause()
          }
      }
  }
</script>


<style scoped>
.v-btn{
  width:40%;
  color: white;
  cursor: pointer;
  padding: .6rem;
  background: #29B6F6;
  border-radius: 4px;
  border:  1px solid #29B6F6;
  font-size: .8rem;
  line-height: .8rem;
  margin: 1.75rem 0;
}
.v-btn:last-child{
  margin-left:.5rem;
}
</style>
