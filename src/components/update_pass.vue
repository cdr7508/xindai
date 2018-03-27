<template>
  <div>
    <v-topbarback text="修改密码"></v-topbarback>
    <div class="content text-left">
      <div class="m-15">
        <div class="text">原登录密码：</div>
        <input v-model="oldPass" type="password" class="pass-input bd-line ">
      </div>
      <div class="m-15">
        <div class="text">输入新登录密码：</div>
        <input v-model="newPass" type="password" class="pass-input bd-line">
      </div>
      <div class="m-15">
        <div class="text">确认新登录密码：</div>
        <input v-model="confirmPass" type="password" class="pass-input bd-line">
      </div>

      <div class="m-15">
        <button class="mt-15 btn" @click="updatePass">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>

  import topbarback from '@/components/topbarback/topbarback'
  import config from '@/config/config'
  import check from '@/util/check'
  import {setCookie,getCookie} from '@/util/user'
  import getuser from '@/util/getuser'
  export default {
    name: 'update_pass',
    components: {
      'v-topbarback': topbarback
    },
    data(){
        return {
            oldPass:'',
            newPass:'',
            confirmPass:''
        };
    },

    methods:{
        updatePass(){
            var user = getuser();

          if(this.oldPass!=null&&this.newPass!=null&&this.confirmPass!=null){
              this.$http.post(config.baseUrl+'/app/changePasswd.do', {
                  'id':user.id,
                  'paramMap.oldPassword':this.oldPass,
                  'paramMap.password':this.newPass,
                  'paramMap.confirmPassword':this.confirmPass,
              }, {
                  headers: {
                  },
                  emulateJSON: true
              }).then(function(response) {
                  if(response.data.code ==1001){
                      this.$router.replace({ path: '/login/go' })
                  }
                  if(response.data.statusCode==200){
                      layer.open({
                          content:'密码修改成功!',
                          btn:['知道了']
                      })
                      user.password = this.newPass;
                      localStorage.setItem('userinfo',JSON.stringify(user));
                    setCookie('password', this.newPass ,'d365')
                      this.$router.back();
                  }else {
                      layer.open({
                          content:'密码修改失败!',
                          btn:['知道了']
                      })
                  }

              }, function(err) {
                  this.$router.replace({ path: '/login/go' })
              });

            }
        }
    }
  }
</script>


<style scoped>
</style>
