import Vue from 'vue'
import VueResource from 'vue-resource'
import config from '@/config/config'
Vue.use(VueResource);
function reLogin(){
  var userinfo = JSON.parse(localStorage.getItem('userinfo'));
  var p = JSON.parse(localStorage.getItem('p'));
    Vue.$http.post(config.baseUrl+'/app/adminLogin.do', {
        'pageId' : 'adminlogin',
        'paramMap.userName' : this.username,
        'paramMap.password' : this.password,
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
            localStorage.setItem('p', this.password);
            // this.$router.replace({ path: '/home/task' });
        }

    }, function(err) {
        // if(err.data.message){
        //     layer.open({
        //         content:err.data.message,
        //         btn:['知道了']
        //     })
        // }else {
        //
        //     layer.open({
        //         content : '服务器或网络异常',
        //         btn : ['知道了']
        //     })
        // }
    });
  // axios({
  //   method: 'post',
  //   url: axios.defaults.baseURL+'/app/adminLogin.do',
  //   data: {
  //     'pageId' : 'adminlogin',
  //     'paramMap.userName' : userinfo.userName,
  //     'paramMap.password' : userinfo.password,
  //     'paramMap.code' : '2017'
  //   }
  // }).then((response) =>{
  //   var data =   response.data;
  //
  //   if(data.statusCode==200){
  //     let user={
  //       id:data.data.id,
  //       realName:data.data.realName,
  //       userName:data.data.userName,
  //       // password:data.data.password,
  //       password:p,
  //       time:data.data.lastTime,
  //       appDepartment:data.data.appDepartment,
  //       appMainPosition:data.data.appMainPosition,
  //       specPriv:data.data.specPriv,
  //     }
  //     localStorage.setItem('userinfo', JSON.stringify(user));
  //   }
  // }).catch((err)=>{
  //   console.log(err.data);
  // });
}
export default reLogin;


