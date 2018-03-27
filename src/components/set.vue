<template>
    <div>
        <!--<v-header text="审批"></v-header>-->
        <v-topbarback text="个人中心"></v-topbarback>
        <div class="content">
            <div class="persin-info">
                <div class="person-info-head clearfix">
                    <div class="fl"><img src="../assets/task_head.svg" class="mr5"> <span class="uname">{{user.realName}}</span></div>
                    <span class="set fr" @click="loginout">退出</span>
                </div>
                <div class="person-info-desc clearfix">
                    <p><img src="../assets/task_department.svg" class="pi-img mr5"><span>部门：{{user.appDepartment}}</span></p>
                    <p><img src="../assets/task_post.svg" class="pi-img mr5"><span>岗位：{{user.appMainPosition}}</span></p>
                </div>
                <div>
                    <span class="person-login-time">上次登录时间：{{user.time | formatDate}}</span>
                </div>
            </div>
            <div class="list-block">
                <ul>
                  <router-link to="/update_pass">
                    <li>
                        <a href="" class="item-link item-content">
                          <div class="item-inner">
                            <div class="item-title c-3d"><img src="../assets/task_password.svg" class="pc-img">修改密码</div>
                          </div>
                        </a>
                      <div class="ml-15 fill-line"></div>

                    </li>
                  </router-link>
                  <router-link to="/about">
                    <li>
                      <a href="/demos/list/view-list" class="item-link item-content">
                        <div class="item-inner">
                          <div class="item-title c-3d"><img src="../assets/task_about.svg" class="pc-img">关于我们</div>
                        </div>
                      </a>
                    </li>
                  </router-link>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import topbarback from '@/components/topbarback/topbarback'
    import {formatDate} from '@/util/util.js';
    import config from '@/config/config'
    import check from '@/util/check'
    import {setCookie,getCookie,clearCookie} from '@/util/user'
    import getuser from '@/util/getuser'
    import { mapActions } from 'vuex'
    export default {
        name : 'task',
        components : {
            'v-topbarback' : topbarback
        },
      data(){
        return {
          user:getuser(),
        };

      } ,
      filters: {
        formatDate(time) {
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      methods:{
        ...mapActions(['removeUser']),
          loginout(){
              this.$http.get(config.baseUrl+'/app/adminLoginOut.do', {
                  headers: {
                  },
                  emulateJSON: true
              }).then(function(response) {
                  if(response.data.code ==1001){
                      this.$router.replace({ path: '/login/go' })
                  }
                  this.removeUser('userinfo')
                clearCookie()
                  this.$router.replace({ path: '/login' });

              }, function(err) {
                  this.$router.replace({ path: '/login/go' })
              });

              }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list-block {
        margin: 0;
    }
    .pc-img{
        width:1rem;
        vertical-align:middle;
        margin-right:.8rem;
    }
</style>
