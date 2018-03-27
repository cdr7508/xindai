<template>
</template>

<script>

import config from '@/config/config'
import { mapActions ,mapMutations} from 'vuex'

export default {
    mounted () {
       this.relogin()
    },
    methods:{
    ...mapActions(['setUser']),
    ...mapMutations(['modifyTip']),
      relogin(){
          var userinfo = localStorage.getItem('userinfo');
          if(userinfo!='undefined'){
          console.log();
              this.$http.post(config.baseUrl+'/app/adminLogin.do', {
                  'pageId' : 'adminlogin',
                  'paramMap.userName' : JSON.parse(localStorage.getItem('userinfo')).userName,
                  'paramMap.password' : JSON.parse(localStorage.getItem('userinfo')).password,
                  'paramMap.code' : '2017'
              }, {
                  headers: {
                  },
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
                      this.getDataNum(data.data.id);
                        this.$router.go(-1);
                  }else{
                       this.$router.replace({ path: '/login' });

                  }
              }, function(err) {
                    this.$router.replace({ path: '/login' });
              });
          }else{
              this.$router.replace({ path: '/login' });
          }

      },
        getDataNum(id){
            var _this = this;
            this.load=true;
            this.$http.post(config.baseUrl+'/app/index.do', {
                'id' : id
            }, {
                headers: {
                },
                emulateJSON: true
            }).then(function(response){
                this.load=false;
                if(response.data.code ==1001){
                    this.$router.replace({ path: '/relogin' })
                }
                if(response.data.statusCode==200){
                    var data = response.data;
                    let res = response.data.data
                    this.topUnhandledNum=res.unhandledNum;
                    this.modifyTip({warnNum:res.warnNum,unhandledNum:res.unhandledNum})
                }else{
                    layer.open({
                        content:response.data.message,
                        btn:['知道了']
                    })
                }

            }, function(err){
                console.log(err);
            });

        }
  }
}
</script>
<style scoped>

</style>
