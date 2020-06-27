import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

const state = {
  user: null, //管理员id
  grade: null, //管理员权限
  username: null
};
const mutations = {
  add(state, newuser) {
    //用户登录后赋值操作
    state.user = newuser;
  },
  reduce(state) {
    //删除登录信息操作
    state.user = null;
  },
  adminoperating(state, data) {
    //登陆传参grade
    state.grade = data;
  },
  username(state, data) {
    //登陆传参grade
    state.username = data;
  }
};
export default new vuex.Store({
  state,
  mutations
});
