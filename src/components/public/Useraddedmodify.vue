<template>
<div>
  <H1>管理员修改</H1>
  <br/>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="用户名" prop="username">
   <div>{{form.username}}</div>
  </el-form-item>
  <el-form-item label="手机号" prop="phonenumber">
      <div>{{form.phonenumber}}</div>
  </el-form-item>
  <el-form-item label="部门">
    <el-input v-model="form.depatment"></el-input>
  </el-form-item>
  <el-form-item label="权限" prop="status">
    <el-radio-group v-model="form.status">
      <el-radio label="1">超级管理员</el-radio>
      <el-radio label="2">管理员</el-radio>
      <el-radio label="3">访客帐号</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.remarks"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交</el-button>
    <el-button @click="exit">取消</el-button>
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
        id: "id",
        name: "用户名",
        password: "密码",
        phonenumber: "手机号",
        department: "部门",
        status: "权限",
        remarks: "备注"
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
      if (this.form.status == "") {
        this.$message.error("权限为必填项");
      } else {
        this.$axios({
          //超级管理员才能修改
          method: "post",
          url: `${uapi}/index.php/Home/Index/index`,
          data: {
            user_id: this.$store.state.user,
            id: this.form.id,
            depatment: this.form.depatment,
            status: this.form.status,
            Remarks: this.form.remarks
          }
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$message({
                message: "修改成功",
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
    },
    exit() {
      this.$router.push("/UserManagement");
    }
  },
  mounted: function() {
    //页面装载完成
    if (this.$store.state.admin != null) {
      //如果vuex中有传递的数据，那么把他付给当前页面的engititle
      this.form = this.$store.state.admin;
      //传完之后里面清空vuex
      this.$store.commit("adminoperating", null);
    } else {
      //非法进入的打会首页
      this.$router.push("/Home");
    }
  }
};
</script>
<style>
</style>
