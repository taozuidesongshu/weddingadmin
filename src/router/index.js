import Vue from "vue";
import Router from "vue-router";

import store from "./../vuex/store"; //vuex

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: "/admin/",
  routes: [
    {
      path: "/",
      name: "login", //登录
      component: () => import("@/components/login/login")
    },
    {
      path: "/Home", //首页
      component: () => import("@/components/common/Home"),
      children: [
        {
          path: "/",
          name: "Datastatistics",
          component: () => import("@/components/page/Datastatistics") //
        },
        {
          path: "/NewConstruction", //轮播图
          name: "NewConstruction",
          component: () => import("@/components/page/NewConstruction")
        },
        {
          path: "/functbottom", //功能按钮

          component: () => import("@/components/page/functbottom")
        },
        {
          path: "/BasicTables", //文章
          name: "BasicTables",
          component: () => import("@/components/page/BasicTables")
        },
        {
          path: "/FormInputmodify", //文章修改
          name: "FormInputmodify",
          component: () => import("@/components/tables/FormInputmodify")
        },
        {
          path: "/FormInput", //文章新建
          name: "FormInput",
          component: () => import("@/components/tables/FormInput")
        },
        {
          path: "/Messagepush", //消息推送
          name: "Messagepush",
          component: () => import("@/components/tables/Messagepush")
        },
        {
          path: "/contactme", //我是红娘，联系我们
          name: "contactme",
          component: () => import("@/components/tables/contactme")
        },
        {
          path: "/UserManagement", //管理员管理
          name: "UserManagement",
          component: () => import("@/components/public/UserManagement")
        },
        {
          path: "/Inquiryform", //结婚登记
          name: "Inquiryform",
          component: () => import("@/components/page/Inquiryform")
        },
        {
          path: "/Modifyproject", //用户管理
          name: "Modifyproject",
          component: () => import("@/components/page/Modifyproject")
        },
        {
          path: "/Allengineering", //vip用户管理
          name: "Allengineering",
          component: () => import("@/components/page/Allengineering")
        },
        {
          path: "/Useradded", //添加用户
          name: "Useradded",
          component: () => import("@/components/public/Useradded")
        },
        {
          path: "/personal", //个人资料管理
          name: "personal",
          component: () => import("@/components/public/personal")
        }

        // {
        //   path: "/Datastatistics",
        //   name: "Datastatistics",
        //   component: resolve =>
        //     require(["@/components/page/Datastatistics"], resolve) //第一页展示
        // },
        // {
        //   path: "/BasicTables",
        //   name: "BasicTables",
        //   component: resolve =>
        //     require(["@/components/page/BasicTables"], resolve) //表格
        // },

        // {
        //   path: "/Operationrecord",
        //   name: "Operationrecord",
        //   component: resolve =>
        //     require(["@/components/public/Operationrecord"], resolve) //操作记录
        // },
        //

        // {
        //   path: "/Modifyproject",
        //   name: "Modifyproject",
        //   component: resolve =>
        //     require(["@/components/page/Modifyproject.vue"], resolve) //修改工程
        // },
        // {
        //   path: "/Useraddedmodify",
        //   name: "Useraddedmodify",
        //   component: resolve =>
        //     require(["@/components/public/Useraddedmodify.vue"], resolve) //修改用户
        // }
      ]
    },
    {
      path: "*", //404页面，直接跳转首页
      redirect: "/Home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.state.user == null && to.path != "/") {
    //未登录
    next("/"); //强制跳转登录
  } else {
    next();
  }
});
export default router;
