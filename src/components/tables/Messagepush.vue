<template>
  <!-- 消息推送 -->
  <div>
    <vpageTitle vtitle="消息推送"></vpageTitle>
    <!--按钮  -->
    <el-button type="primary" @click="newbottom">新建消息</el-button>

    <!-- 内容 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="time" label="日期" width="130"></el-table-column>
      <el-table-column prop="title" label="标题" width="300"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="deleteClick(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="新消息" :visible.sync="dialogVisible" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <el-form-item label="消息标题">
          <el-input v-model="newdata.title"></el-input>
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newdata.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import uapi from "@/api/config";
import vpageTitle from "@/components/common/pageTitle";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      newdata: {
        title: "",
        content: ""
      }
    };
  },
  created() {
    this.inform();
  },
  methods: {
    newbottom() {
      //打开弹出层
      let box = {
        title: "",
        content: ""
      };
      this.dialogVisible = true;
      this.newdata = box;
    },
    newok() {
      //新建确认
      axios({
        url: uapi.informadd,
        method: "post",
        data: {
          title: this.newdata.title,
          content: this.newdata.content
        }
      })
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            this.$message.success("新建成功");
            this.dialogVisible = false;
            this.inform();
          } else {
            this.$message.error("新建失败");
          }
        })
        .catch(err => {
          this.$message.error("新建失败" + err);
        });
    },

    deleteClick(row) {
      //删除
      axios({
        url: uapi.informdel,
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.$message.success("删除成功");
            //删除
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });
          } else {
            this.$message.error("删除失败" + res.data.message);
          }
        })
        .catch(err => {
          this.$message.error("删除失败" + err);
        });
    },
    inform() {
      //刷新页面
      axios({
        url: uapi.inform,
        method: "get"
      })
        .then(res => {
          // console.log(res);
          if (res.data.status == 1) {
            this.$message.success("获取成功");
            this.tableData = res.data.data;
          } else if (res.data.data == null) {
            this.$message.error("获取失败:暂无数据");
          }
        })
        .catch(err => {
          // console.log(err);
          this.$message.error("获取失败" + err);
        });
    }
  },
  components: {
    vpageTitle
  }
};
</script>

<style scoped>
</style>