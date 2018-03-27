// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from '@/config/config'
import store from '@/store/index'
import VueResource from 'vue-resource'
import VuePhotoSwipe from '@/photoSwipe'
import {setCookie,getCookie} from '@/util/user'
import getuser from '@/util/getuser'

Vue.use(VuePhotoSwipe)
Vue.use(VueResource);
// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.options.emulateJSON = true
var vm = this
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next()
    // next((response) => {
    //     if(response.data.code=='1001'){
    //         Vue.$router.push('/login')
    //     }
    //     return response
    //     })
});

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
    el : '#app',
    router,
    store,
    template : '<App/>',
    components : {App},
    watch : {
      "$route" : 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
    methods : {
        checkLogin(){
          let div = document.getElementsByClassName('pswp')[0]
          if(div.style.position=='fixed'){
            this.$photoswipe.close()
          }
          var user=getuser();
          var path=this.$route.path
          if (path!='/login' && (!user || !user.userName || user.userName=='undefined') ){
            //如果没有登录状态则跳转到登录页
            this.$router.replace('/login');
          }
        },

    },

})

