<template>
  <el-main id="login">
    <div v-text="titel" class="log_title"></div>
    <div class="log_div">
      <el-input v-model="name" placeholder="用户名"></el-input>
      <el-input v-model="password" placeholder="密码" type="password"></el-input>
      <el-button type="primary" @click="Sub">登陆</el-button>
    </div>
  </el-main>
</template>

<script>
import uapi from "@/api/config";
export default {
  name: "login",
  data() {
    return {
      titel: "婚如意后台管理系统",
      name: "",
      password: ""
    };
  },

  methods: {
    Sub: function() {
      this.$store.commit("username", this.name);
      this.$axios({
        method: "post",
        url: uapi.login,
        data: {
          administrator: this.name,
          admin_password: this.password
        }
      })
        .then(res => {
          if (res.data.status == 1 && res.data.message == "登录成功") {
            //把登录信息发到vuex
            this.$store.commit("add", res.data.data.admin_id);
            this.$store.commit("adminoperating", res.data.data.grade);

            this.$router.push("/Home");
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            //跳转到首页
          } else {
            //帐号密码有问题
            this.$message.error("失败" + res.data.message);
          }
        })
        .catch(err => {
          this.$message.error("失败" + err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  text-align: center;
  font-size: 2rem;
  /* background: url(../../assets/jz_x.jpg) no-repeat;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 100%; */
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.log_title {
  height: 600px;
  color: white;
  line-height: 550px;
}
.log_div {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 200px;
  margin-left: -200px;
  margin-top: -100px;
  border-radius: 5px;
  overflow: hidden;
  color: white;
}
</style>
