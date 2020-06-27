<template>
  <el-table
    :data="tableData2"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="typesof"
      label="操作类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="remarks"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="usernameip"
      label="用户IP">
    </el-table-column>
    <el-table-column
      prop="time"
      label="操作时间">
    </el-table-column>
  </el-table>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import uapi from "@/api/config";
export default {
  mounted: function() {
    this.$axios({
      methods: "get",
      url: `${uapi}/index.php/Home/Index/record`,
      params: {
        user_id: this.$store.state.user
      }
    })
      .then(res => {
        if (res.data.status == 1) {
          this.tableData2 = res.data.data;
          this.$message({
            message: "获取成功",
            type: "success"
          });
        } else {
          this.$message("获取失败" + res.data.message);
        }
      })
      .catch(err => {
        this.$message("获取失败" + err);
      });
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      return "success-row";
    }
  },
  data() {
    return {
      tableData2: [
        {
          username: "",
          typesof: "",
          Remarks: "",
          usernameip: "",
          time: ""
        }
      ]
    };
  }
};
</script>

