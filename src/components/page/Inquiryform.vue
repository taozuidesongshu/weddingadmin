<template>
  <div>
    <v-pageTitle vtitle="结婚登记"></v-pageTitle>
    <!--  -->
    <el-button type="primary" @click="newMessage">新建登记</el-button>

    <!-- 内容 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="res_time" label="日期" width="130"></el-table-column>
      <el-table-column prop="adress" label="登记处" width="300"></el-table-column>
      <el-table-column prop="location" label="地址"></el-table-column>
      <el-table-column prop="working_time" label="工作时间"></el-table-column>
      <el-table-column prop="telephone" label="电话"></el-table-column>
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
    <el-dialog title="新登记点" :visible.sync="dialogVisible" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <el-form-item label="登记处">
          <el-input v-model="newcont.adress"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newcont.location"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作时间">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newcont.working_time"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newcont.telephone"></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bottok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vPageTitle from "../common/pageTitle.vue";
import axios from "axios";
import uapi from "@/api/config";
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],

      newcont: {
        adress: "", //登记处
        location: "", //地址
        working_time: "", //工作时间
        telephone: "" //电话
      }
    };
  },
  components: {
    vPageTitle
  },
  created() {
    //刷新页面
    this.newinquir();
  },
  methods: {
    newMessage() {
      let dom = {
        adress: "", //登记处
        location: "", //地址
        working_time: "", //工作时间
        telephone: "" //电话
      };
      //打开弹层
      this.dialogVisible = true;
      this.newcont = dom;
    },
    bottok() {
      //提交
      axios({
        url: uapi.checkinadd,
        method: "post",
        data: {
          adress: this.newcont.adress,
          location: this.newcont.location,
          working_time: this.newcont.working_time,
          telephone: this.newcont.telephone
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("提交成功");
            this.dialogVisible = false;
            this.newinquir();
          } else {
            this.$message.error("提交失败");
            this.dialogVisible = false;
          }
        })
        .catch(err => {
          this.$message.error("提交失败" + err);
          this.dialogVisible = false;
        });
    },
    deleteClick(row) {
      //删除
      axios({
        url: uapi.checkindel,
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("删除成功");
            //删除
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(err => {
          this.$message.error("删除失败" + err);
        });
    },
    newinquir() {
      //更新方法
      axios({ url: uapi.checkin, method: "post" })
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("获取成功");
            this.tableData = res.data.data;
          } else if (res.data.data == null) {
            this.$message.error("获取失败:暂无数据");
          }
        })
        .catch(err => {
          this.$message.error("获取失败" + err);
        });
    }
  }
};
</script>




<style scoped>
</style>





