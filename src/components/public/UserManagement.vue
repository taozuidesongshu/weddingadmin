<template>
  <div>
    <vPageTitle vtitle="管理员"></vPageTitle>
    <!-- 管理员 -->
    <el-table :data="tableData" border>
      <!-- <el-table-column prop="admin_id" label="id"></el-table-column> -->
      <el-table-column prop="administrator" label="用户名"></el-table-column>
      <!-- <el-table-column prop="admin_password" label="密码"></el-table-column> -->
      <el-table-column prop="grade" label="权限">
        <template slot-scope="scope">
          <div v-if="scope.row.grade==7">超级管理员</div>
          <div v-else>管理员</div>
        </template>
      </el-table-column>
      <el-table-column prop="re_time" label="添加时间"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="modify(scope.row)">操作</el-button>
          <el-button type="warning" @click="dele(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="管理员资料" :visible.sync="dialogVisible" width="40%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <!--  -->
        <el-form ref="newrow" label-width="100px">
          <el-form-item>帐号：{{newrow.administrator}}</el-form-item>
          <el-form-item>密码：**************************</el-form-item>

          <el-form-item>权限：
            <el-radio-group v-model="newrow.grade">
              <el-radio label="7">超级管理员</el-radio>
              <el-radio label="8">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>是否禁用：
            <el-switch
              v-model="newrow.status"
              active-value="0"
              inactive-value="1"
              active-color="#13ce66"
              inactive-color="#8a8a8a"
              active-text="启用"
              inactive-text="禁用"
            ></el-switch>
          </el-form-item>
          <el-form-item>备注：
            <el-input type="textarea" v-model="newrow.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
        <!--  -->
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vPageTitle from "../common/pageTitle.vue";
import uapi from "@/api/config";
import axios from "axios";
export default {
  components: {
    vPageTitle
  },
  methods: {
    modify(row) {
      //查看
      // console.log(row);
      this.dialogVisible = true;
      this.newrow = row;
    },
    onSubmit() {
      //修改
      axios({
        method: "post",
        url: uapi.index,
        data: {
          id: this.newrow.admin_id,
          admin_id: this.$store.state.user,
          status: this.newrow.status,
          grade: this.newrow.grade,
          remark: this.newrow.remark
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message("修改失败" + res.data.message);
          }
        })
        .catch(err => {
          this.$message("修改失败" + err);
        });
    },

    dele(row) {
      //删除用户
      this.$axios({
        method: "post",
        url: uapi.userdel,
        data: {
          id: row.id,
          admin_id: this.$store.state.user
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });

            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message("删除失败" + res.data.message);
          }
        })
        .catch(err => {
          this.$message("删除失败" + err);
        });
      // }
    }
  },
  created() {
    //获取列表
    this.$axios({
      method: "post",
      url: uapi.userxx,
      data: {
        admin_id: this.$store.state.user,
        grade: this.$store.state.grade
      }
    })
      .then(res => {
        // console.log(res);
        //获取后台 返回的信息
        // console.log(res);
        if (res.data.status == 1) {
          this.tableData = res.data.data;
        } else {
          this.$message("获取用户信息失败" + res.data.message);
        }
      })
      .catch(err => {
        this.$message("获取用户信息失败" + err);
      });
  },

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      newrow: {}
    };
  }
};
</script>

<style>
</style>
