<template>
  <div>
    <vPageTitle vtitle="文章"></vPageTitle>
    <!-- 表格 -->
    <el-button type="primary" @click="edit">新建文章</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="tname" label="作者" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.nameimgs" width="20%">
          {{scope.row.tname}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" width="300"></el-table-column>
      <el-table-column label="简介" row-style="height:80px;">
        <template slot-scope="scope">
          <div class="intro">{{scope.row.intro}}</div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.img1" alt width="20%">
          <img :src="scope.row.img2" alt width="20%">
          <img :src="scope.row.img3" alt width="20%">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="artion(scope.row)">编辑</el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="deleteClick(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vPageTitle from "../common/pageTitle.vue";
import axios from "axios";
import uapi from "@/api/config";
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    vPageTitle
  },
  created() {
    axios({
      url: uapi.articlelib,
      method: "post"
    })
      .then(res => {
        if (res.status == 200) {
          this.$message.success("获取文章成功");
          this.tableData = res.data.data;
        }
      })
      .catch(error => {
        this.$message.error("获取文章失败" + error);
      });
  },

  methods: {
    edit() {
      //新建文章
      this.$router.push({ name: "FormInput" });
    },
    artion(row) {
      //传参给文章编辑页面
      this.$router.push({ name: "FormInputmodify", params: { row } });
    },
    deleteClick(row) {
      //删除接口
      // console.log(row.id);
      axios({
        url: uapi.deleteintro,
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("删除文章成功");
            //删除
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });
          }
        })
        .catch(error => {
          this.$message.error("删除文章失败" + error);
        });
    }
  }
};
</script>

<style scoped>
.intro {
  height: 100px;
  overflow: hidden;
}
</style>