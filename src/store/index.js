import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const userinfo = JSON.parse(localStorage.getItem('userinfo'))
    const state={
      unhandledNum:0,
      warnNum:0,
      userinfo:userinfo || {}
    }
const mutations =  {
  setUser(state, userinfo){
    localStorage.setItem('userinfo', JSON.stringify(userinfo))
    Object.assign(state, userinfo)
  },
  removeUser(state,user){
    localStorage.removeItem(user);
    state.userinfo={}
    state.isLogin=false
  },
  modifyTip(state,obj){
      state.warnNum = obj.warnNum
      state.unhandledNum = obj.unhandledNum
  }

}
const actions= {
  setUser({commit}, userinfo) {
    commit('setUser', userinfo)
  },
  removeUser({commit},user) {
    commit('removeUser', user)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})





