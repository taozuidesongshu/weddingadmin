
<template>
  <div>
    <h1>个人资料修改</h1>
    <el-form ref="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名">
        <div>{{form.username}}</div>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password2" type="password" placeholder="再次输入密码"></el-input>
      </el-form-item>

      <!-- <el-form-item label="状态">
        <div>{{form.depatment}}</div>
      </el-form-item>-->
      <el-form-item label="权限">
        <div v-if="form.status==7">超级管理员</div>
        <div v-else>管理员</div>
      </el-form-item>
      <!-- <el-form-item label="备注">
        <div>{{form.remarks}}</div>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="out">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uapi from "@/api/config";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: this.$store.state.username,
        password: "",
        password2: "",
        status: this.$store.state.grade
      },
      rules: {
        name: [{ required: true, message: "请输入账户名", trigger: "blur" }],
        passwprd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phonenumber: [
          {
            type: "number",
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          }
        ],
        Permission: [
          { required: true, message: "请选择权限", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      //修改
      if (
        this.form.password == "" ||
        this.form.password2 == "" ||
        this.form.password != this.form.password2
      ) {
        this.$message.error("请填写必填项");
      } else {
        axios({
          //用户修改自己的资料
          method: "post",
          url: uapi.changepw,
          data: {
            admin_id: this.$store.state.user,
            password: this.form.password
          }
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$router.push("/Home");
            } else {
              this.$message.error("失败" + res.data.message);
            }
          })
          .catch(err => {
            this.$message.error("失败" + err);
          });
      }
    },
    out() {
      //取消
      this.$router.push("/Home");
    }
  }
};
</script>
<style>
</style>
