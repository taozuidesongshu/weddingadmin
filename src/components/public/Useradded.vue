<template>
  <div>
    <el-form ref="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="form.administrator" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.admin_password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码">
        <el-input v-model="form.admin_password1" type="password" placeholder="再次输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机号">
        <el-input v-model="form.phonenumber" type="number" placeholder="手机号只能为数字"></el-input>
      </el-form-item>-->
      <el-form-item label="权限">
        <el-radio-group v-model="form.grade">
          <el-radio label="7">超级管理员</el-radio>
          <el-radio label="8">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uapi from "@/api/config";
export default {
  data() {
    return {
      form: {
        administrator: "",
        admin_password: "",
        admin_password1: "",
        grade: "",
        remark: ""
      },
      rules: {
        administrator: [
          { required: true, message: "请输入账户名", trigger: "blur" }
        ],
        admin_password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],

        grade: [{ required: true, message: "请选择权限", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.administrator == "" ||
        this.form.grade == "" ||
        this.form.admin_password == "" ||
        this.form.admin_password1 == ""
      ) {
        this.$message.error("请填写必填项,手机号必须为数字");
      } else if (this.form.admin_password != this.form.admin_password1) {
        this.$message.error("两次密码不一致");
      } else {
        this.$axios({
          method: "post",
          url: uapi.adminadd,
          data: {
            administrator: this.form.administrator,
            admin_password: this.form.admin_password,
            grade: this.form.grade,
            remark: this.form.remark
          }
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
            } else {
              this.$message.error("失败" + res.data.message);
            }
          })
          .catch(err => {
            this.$message.error("失败" + err);
          });
      }
    }
  }
};
</script>
<style>
</style>
