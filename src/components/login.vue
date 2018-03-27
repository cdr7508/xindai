<template>
  <div>
    <v-header text="用户登录"></v-header>
    <div class="content bg-fff">
      <div class="clearfix text-center mt-30">
        <img class="icon-img" src="../assets/logo1.png" >
      </div>
      <div class="clearfix text-center mt-15">
        <img class="icon-img2" src="../assets/logo2.svg">
      </div>
      <div class="pd-15 mt-30">
        <p class="login-p">
          <label for="username">用户名</label>
          <input type="text" placeholder="请输入用户名" v-model="username" id="username"/>
        </p>
        <p class="login-p">
          <label for="password">密码</label>
          <input type="password" placeholder="请输入您的登录密码" v-model="password" id="password"/>
        </p>

        <div class="mt-20">
          <button class="mt-60 btn" @click="login">确认登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '@/components/topbar/topbar'
import config from '@/config/config'
import { mapActions} from 'vuex'
import {setCookie,getCookie} from '@/util/user'
import getuser from '@/util/getuser'
export default {
  components: {
      'v-header' : topbar
  },
  data(){
    return {
        username:'',
        password:''
      }
  },
    mounted(){

      if(this.$route.path=='/login/go'){
          this.relogin()
      }

    },
    methods:{
    ...mapActions(['setUser']),
        relogin(){
            var  _this = this
//            var userinfo = localStorage.getItem('userinfo');
            var userinfo = getuser();
            console.log(userinfo);
            if(userinfo!='undefined'){

                this.$http.post(config.baseUrl+'/app/adminLogin.do', {
                    'pageId' : 'adminlogin',
                    'paramMap.userName' : userinfo.userName,
                    'paramMap.password' : userinfo.password,
                    'paramMap.code' : '2017'
                }, {
                    headers: {
                    },
                    credentials: true,
                    emulateJSON: true
                }).then(function(response) {
                    var data = response.data;
                    if(data.statusCode==200){
                        var user={
                            id:data.data.id,
                            realName:data.data.realName,
                            userName:data.data.userName,
                            password:data.data.password,
                            time:data.data.lastTime,
                            appDepartment:data.data.appDepartment,
                            appMainPosition:data.data.appMainPosition,
                            specPriv:data.data.specPriv,
                        }
                        this.setUser(user);
                      setCookie('id', data.data.id ,'d365')
                      setCookie('realName', data.data.realName ,'d365')
                      setCookie('userName', data.data.userName ,'d365')
                      setCookie('password', data.data.password ,'d365')
                      setCookie('lastTime', data.data.lastTime ,'d365')
                      setCookie('appDepartment', data.data.appDepartment ,'d365')
                      setCookie('appMainPosition', data.data.appMainPosition ,'d365')
                      setCookie('specPriv', data.data.specPriv ,'d365')
//                        this.$router.go(-1);
                        this.$router.replace({ path: '/home/task' });
//                        layer.open({
//                            content:'登录成功',
//                            btn:['知道了'],
//                            yes:function(){
//                                _this.$router.replace({ path: '/home/task' });
//                            }
//                        })
                    }
                }, function(err) {
//                    alert('登录失败')
                    this.$router.replace({ path: '/login' });
                });
            }else{
//                alert('没有用户名')
                this.$router.replace({ path: '/login' });
            }

        },
      login(){
            var  _this = this
            if(this.username && this.password){
              this.$http.post(config.baseUrl+'/app/adminLogin.do', {
                  'pageId' : 'adminlogin',
                  'paramMap.userName' : this.username,
                  'paramMap.password' : this.password,
                  'paramMap.code' : '2017'
              }, {
                  headers: {
                  },
                  credientials:true,
                  emulateJSON: true
              }).then(function(response) {
                  var data = response.data;
                  if(data.statusCode==200){
                    var user={
                      id:data.data.id,
                      realName:data.data.realName,
                      userName:data.data.userName,
                      password:data.data.password,
                      time:data.data.lastTime,
                      appDepartment:data.data.appDepartment,
                      appMainPosition:data.data.appMainPosition,
                      specPriv:data.data.specPriv,
                    }
                    this.setUser(user)
                    setCookie('id', data.data.id ,'d365')
                    setCookie('realName', data.data.realName ,'d365')
                    setCookie('userName', data.data.userName ,'d365')
                    setCookie('password', data.data.password ,'d365')
                    setCookie('lastTime', data.data.lastTime ,'d365')
                    setCookie('appDepartment', data.data.appDepartment ,'d365')
                    setCookie('appMainPosition', data.data.appMainPosition ,'d365')
                    setCookie('specPriv', data.data.specPriv ,'d365')
                      this.$router.replace({ path: '/home/task' });
//                      layer.open({
//                          content:'登录成功',
//                          btn:['知道了'],
//                          yes:function(){
//                              _this.$router.replace({ path: '/home/task' });
//                          }
//                      })
                  }
                  else{
                      console.log(data);
                      layer.open({
                          content:response.data.message,
                          btn:['知道了']
                      })
                  }

              }, function(err) {
                  if(err.data.message){
                        layer.open({
                          content:err.data.message,
                          btn:['知道了']
                        })
                      }else {

                      layer.open({
                          content : '服务器或网络异常',
                          btn : ['知道了']
                      })
                  }
              });

          }else{
            layer.open({
              content:'请输入用户名和密码',
              btn:['知道了']
            })
          }
      },
  }
}
</script>
<style scoped>
  .c-cb{
    color: #666;
  }
.content{
  background: #fff;
}
.login-p{
  border-bottom:1px solid #ccc;
  height:2.5rem;
  line-height:2.5rem;
}
  .login-p label{
    float:left;
    width:30%;
    text-align:left;

  }
  .login-p input{
    float:left;
    width:70%;
    background:none;
    border:0;
    height:2.5rem;
    line-height:2.5rem;
  }
  .login-p:nth-child(even){
    margin-top:.6rem;
  }

  input:focus,input:active{
    border-bottom:1px solid #666;
  }
</style>
