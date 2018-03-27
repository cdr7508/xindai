import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import task from '@/components/task'
import opration from '@/components/opration/opration'
import query from '@/components/query'
import query_yewu from '@/components/query_yewu'
import yewu_detail from '@/components/yewu_detail'
import yd_detail from '@/components/yd_detail'
import yd_kehuziliao from '@/components/yd_kehuziliao'
import yd_danbaocuoshi from '@/components/yd_danbaocuoshi'
import yd_danbaocuoshi_detail from '@/components/yd_danbaocuoshi_detail'
import yd_fujianqindan from '@/components/yd_fujianqindan'
import yd_fujianqindan_p2p from '@/components/yd_fujianqindan_p2p'
import yd_fujianqindan_detail from '@/components/yd_fujianqindan_detail'
import yd_seehetong from '@/components/yd_seehetong'
import yd_quanzhengqindan from '@/components/yd_quanzhengqindan'
import yd_chuzhangjilu from '@/components/yd_chuzhangjilu'
import yd_daihoujianchabd from '@/components/yd_daihoujianchabd'
import yd_wujifenlei from '@/components/yd_wujifenlei'
import yd_huankuanqingkuang from '@/components/yd_huankuanqingkuang'
import yd_danganjiechuxq from '@/components/yd_danganjiechuxq'
import warning from '@/components/warning'
import set from '@/components/set'
import warning_five from '@/components/warning_five'
import warning_thirty from '@/components/warning_thirty'
import warning_over from '@/components/warning_over'
import weishenpi from '@/components/weishenpi'
import yishenpi from '@/components/yishenpi'
import shenpi from '@/components/shenpi'
import shenpijilu from '@/components/shenpijilu'
import update_pass from '@/components/update_pass'
import login from '@/components/login'
import uploadFile from '@/components/uploadFile'
import sort from '@/components/sort'  //中转
import yd_detail2 from '@/components/yd_detail2'
import yd_kehuziliao_qy from '@/components/yd_kehuziliao_qy'
import ydht_sort from '@/components/ydht_sort'
import tongyi from '@/components/sure/tongyi'
import jujue from '@/components/sure/jujue'
import yd_daihoujianchajilu from '@/components/yd_daihoujianchajilu'
import yd_daihoujianchajilu_detail from '@/components/yd_daihoujianchajilu_detail'
import about from '@/components/about'
import imgview from '@/components/imgview'
import videoview from '@/components/videoview'
import fjdetail from '@/components/yd_fujianqindan_detail'

Router.prototype.goBack = function(){
    this.isBack = true
    window.history.go(-1)
}
Vue.use(Router)

export default new Router({
    // mode : 'history',
    routes : [
        {
            path : '/',
            // name : 'Home',
            component : Home,
            children : [
                {
                    path : '/',
                    // name : 'task',
                    redirect : {name : 'task'}
                },
                {
                    path : '/home',
                    // name : 'task',
                    redirect : {name : 'task'}
                },
                {
                    path : 'home/task',
                    name : 'task',
                    component : task
                },
                {
                    path : 'home/opration',
                    name : 'opration',
                    component : opration
                },
                {
                    path : 'home/query',
                    name : 'query',
                    component : query
                },
              {
                path : '/query_yewu',
                name: 'query_yewu',
                component : query_yewu
              },
                {
                    path : 'home/warning',
                    name : 'warning',
                    component : warning
                },
                {
                    path : '/set',
                    name : 'set',
                    component : set
                },
                {
                    path : '/shenpi',
                    component : shenpi,
                    children : [
                        {
                            path : '/shenpi',
                            redirect : {name : 'weishenpi'}
                        },
                        {
                            path : '/shenpi/weishenpi',
                            name : 'weishenpi',
                            component : weishenpi
                        },
                        {
                            path : '/shenpi/yishenpi',
                            // name: 'yishenpi',
                            component : yishenpi
                        },
                    ]
                }
            ]
        },
        {
            path : '/login',
            component : login
        },
        {
            path : '/login/:go',
            component : login
        },
      {
        path : '/weishenpi',
        // name: 'weishenpi',
        component : weishenpi
      },
      {
        path : '/yishenpi',
        // name: 'yishenpi',
        component : yishenpi
      },
        {
            path : '/warning_five',
            // name: 'warning_five',
            component : warning_five,
        },
        {
            path : '/warning_thirty',
            // name: 'warning_thirty',
            component : warning_thirty,
        },
        {
            path : '/warning_over',
            // name: 'warning_over',
            component : warning_over,
        },
        {
            path : '/yewu_detail/:busiId/:name/:custId/:type',
            name : 'yewu_detail',
            component : yewu_detail,
        },
        {
            path : '/yd_detail/:busiId',
            name: 'yd_detail',
            component : yd_detail,
        },
        {
            path : '/yd_kehuziliao/:custId',
            name : 'yd_kehuziliao',
            component : yd_kehuziliao,
        },
        {
            path : '/yd_danbaocuoshi_detail/*',
            name : 'yd_danbaocuoshi_detail',
            component : yd_danbaocuoshi_detail,
        },
        {
            path : '/yd_fujianqindan/:busiId',
            name : 'yd_fujianqindan',
            component : yd_fujianqindan,
        },
        {
            path : '/yd_fujianqindan_p2p/:objectNo/:nodeno/:modelNo/:status',
            name : 'yd_fujianqindan_p2p',
            component : yd_fujianqindan_p2p,
        },
        {
            path : '/yd_fujianqindan_detail/:archives_type_name/:realName/:publishTime',
            // name: 'yd_fujianqindan_detail',
            component : yd_fujianqindan_detail,
        },

        {
            path : '/yd_seehetong/:busiId',
            name: 'yd_seehetong',
            component : yd_seehetong,
        },
        {
            path : '/yd_quanzhengqindan/:busiId/:name',
            name: 'yd_quanzhengqindan',
            component : yd_quanzhengqindan,
        },
        {
            path : '/yd_chuzhangjilu/:busiId',
            name: 'yd_chuzhangjilu',
            component : yd_chuzhangjilu,
        },
        {
            path : '/yd_daihoujianchabd',
            // name: 'yd_daihoujianchabd',
            component : yd_daihoujianchabd,
        },

        {
            path : '/yd_wujifenlei/:busiId/:objectNo',
            name: 'yd_wujifenlei',
            component : yd_wujifenlei,
        },

        {
            path : '/yd_huankuanqingkuang/:busiId',
            name: 'yd_huankuanqingkuang',
            component : yd_huankuanqingkuang,
        },
        {
            path : '/yd_danganjiechuxq/:objectNo',
            name: 'yd_danganjiechuxq',
            component : yd_danganjiechuxq,
        },
        {
            path : '/warning_five',
            // name: 'warning_five',
            component : warning_five,
        },
        {
            path : '/warning_thirty',
            // name: 'warning_thirty',
            component : warning_thirty,
        },
        {
            path : '/warning_over',
            // name: 'warning_over',
            component : warning_over,
        },
        {
            path : '/yd_danbaocuoshi/:busiId',
            name : 'yd_danbaocuoshi',
            component : yd_danbaocuoshi,
        },
        {
            path : '/update_pass',
            // name: 'update_pass',
            component : update_pass,
        },
        {
              path : '/uploadFile/:busiId/:title/:custId',
            name : 'uploadFile',
            component : uploadFile,
        },
        // {
        //     path : '/sort/:modelname/:objectNo/:status/:busiId/:nodeno/:modelNo/:custType/:cusName/:enterTime/:opition/:custId/:enterName',//审批列表项路由
        //     name : 'sort',
        //     component : sort
        // },
        { path: '/sort/*',
            name:sort,
            component : sort
        },
        {
            path : '/shenpijilu/:objectNo/:modelNo',
            name : 'shenpijilu',
            component : shenpijilu
        },

        {
            path : '/yd_detail2/:busiId',
            name : 'yd_detail2',
            component : yd_detail2,
        },
        {
            path : '/yd_kehuziliao_qy',
            name : 'yd_kehuziliao_qy',
            component : yd_kehuziliao_qy,
        },
        {
            path : '/ydht_sort/:busiId/:contractType/:contractId',//合同详情路由
            name : 'ydht_sort',
            component : ydht_sort,
        },
        {
            path : '/tongyi/:busiId/:objectNo/:modelNo/:nodeno/:custId/:status',
            name : 'tongyi',
            component : tongyi
        },
        {
            path : '/jujue/:busiId/:objectNo/:modelNo/:nodeno',
            name : 'jujue',
            component : jujue
        },
      {
        path : '/yd_daihoujianchajilu/:busiId',
        name : 'yd_daihoujianchajilu',
        component : yd_daihoujianchajilu
      },
      {
        path : '/yd_daihoujianchajilu_detail/:id',
        name : 'yd_daihoujianchajilu_detail',
        component : yd_daihoujianchajilu_detail
      },
      {
        path : '/about',
        name : 'about',
        component : about
      },
      { path: '/fjdetail/*',
        component : fjdetail
      },
      { path: '/imgview/*',
        name:'imgview',
        component : imgview
      },
      { path: '/videoview/:videosrc',
        name:'videoview',
        component : videoview
      },

      {
        path : '*',
        component : task
      },
    ]
})
