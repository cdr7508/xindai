<template>
  <div class="select-wrap">
    <input type="text" class="select-input" @click="getText" v-model="selected" readonly />
    <ul v-show="isClick" class="select-list">
      <li v-for="(item,index) in items" @click="selectItem(index,$event)">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  export default{
      props:['items'],
    data(){
          return {
            isClick:false,
            selected:this.items[0]
          }
    },
    methods:{
      getText(){
//          console.log(1);
        this.isClick=true
      },
      selectItem(index,event){
        this.selected=this.items[index];
        this.isClick=false
      }
    }
  }
</script>
<style>
.select-wrap{
  height:2.2rem;
  line-height:2.2rem;
  position:relative;
}
.select-wrap:after{
  content:'';
  position:absolute;
  right: .2rem;
  top: .6rem;
  width:12px;
  height:12px;
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
  transform:rotate(-45deg);
}
.select-input{
  width:100%;
  height:2.2rem;
  line-height:2.2rem;
  display:block;
  border:0;
  /*border-bottom:1px solid #e5e5e5;*/
  font-size:.8rem;
  padding-left:.5rem;
  background:none;
}
  .select-list{
    position:absolute;
    left: 0;
    top: 2.2rem;
    z-index:9999;
    background-color:#fff;
    width:100%;
    padding:0 .4rem;
    box-shadow:0 2px 5px 0 rgba(0,0,0,.2);
  }
.select-list li{
  height:2.2rem;
  line-height:2.2rem;
  text-align:left;
  border-bottom:1px solid #e5e5e5;
  font-size:.8rem;
}
</style>
