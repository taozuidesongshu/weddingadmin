<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <el-menu-item index="Datastatistics">
        <span class="sb-icon">
          <i class="el-icon-menu"></i>
        </span>
        <span class="sb-cn">系统信息</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <span class="sb-icon">
            <i class="el-icon-picture-outline"></i>
          </span>
          <span class="sb-cn">图片管理</span>
        </template>
        <el-menu-item index="contactme">推广连接</el-menu-item>
        <el-menu-item index="NewConstruction">首页轮播</el-menu-item>
        <el-menu-item index="functbottom">功能按钮</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span class="sb-icon">
            <i class="icon iconfont icon-duihua"></i>
          </span>
          <span class="sb-cn">消息推送</span>
        </template>
        <el-menu-item index="BasicTables">婚礼说</el-menu-item>
        <el-menu-item index="Messagepush">站内消息</el-menu-item>
        <el-menu-item index="Inquiryform">结婚登记</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span class="sb-icon">
            <i class="icon iconfont icon-weibiaoti101-copy"></i>
          </span>
          <span class="sb-cn">会员中心</span>
        </template>
        <el-menu-item index="Modifyproject">会员管理</el-menu-item>
        <el-menu-item index="Allengineering">VIP会员</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span class="sb-icon">
            <i class="icon iconfont icon-tubiao01"></i>
          </span>
          <span class="sb-cn">系统设置</span>
        </template>
        <el-menu-item index="UserManagement">用户管理</el-menu-item>
        <el-menu-item index="Useradded">添加用户</el-menu-item>
     
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>

<style scoped>
.icon {
  vertical-align: middle;
  margin-right: 8px;
  margin-left: 3px;
  width: 24px;
  text-align: center;
  font-size: 18px;
}
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  left: 0;
  top: 66px;
  bottom: 0;
}
.sidebar > ul {
  height: 100%;
}

.el-menu-item,
.el-submenu__title {
  font-size: 14px;
}

.material-icons {
  font-size: 12px;
}
</style>
