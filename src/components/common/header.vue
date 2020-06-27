<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :xs="16" :sm="16" :md="14">
        <div class="logo">
          <span class="logo_prefix">婚如意后台管理系统</span>
        </div>
      </el-col>

      <el-col :xs="4" :sm="6" :md="8">
        <div class="website">
          <span></span>
        </div>
      </el-col>

      <el-col :xs="4" :sm="2" :md="2">
        <div class="user-header">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="../../../static/images/b_header.jpg" width="50px">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="setting-div">
                  <span class="setting-icon">
                    <i class="el-icon-menu"></i>
                  </span>
                  <span class="setting-string" @click="Jump">修改信息</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="setting-div">
                  <span class="setting-icon">
                    <i class="el-icon-menu"></i>
                  </span>
                  <span class="setting-string" @click="exitx">退出</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 删除登陆
    exitx() {
      this.$store.commit("reduce", null);
      this.$router.push("/");
    },
    Jump() {
      //修改资料
      this.$router.push("/personal");
      // console.log(1);
    }
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  font-size: 14px;
  line-height: 66px;
  background-color: #324157;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  padding: 0 32px 0 40px;
  overflow: hidden;
}
.header .logo {
  float: left;
  cursor: pointer;
  font-size: 22px;
}
.logo_prefix {
  color: #209e91;
}
.logo_suffix {
  color: #fff;
}
.header .search {
  float: left;
  color: #fff;
  font-size: 14px;
}
.website span {
  display: inline-block;
  color: #209e91;
}
.website span:first-child {
  color: #fff;
}

.user-header {
  line-height: 10px;
  padding-top: 7px;
  font-size: 12px;
}
.user-header img {
  border-radius: 50%;
  cursor: pointer;
}

.setting-div {
  height: 30px;
  line-height: 30px;
  clear: both;
  padding: 5px;
}
.setting-div span {
  display: block;
  float: left;
  font-size: 12px;
}
.setting-icon {
  padding-top: 3px;
  padding-right: 3px;
}
</style>
