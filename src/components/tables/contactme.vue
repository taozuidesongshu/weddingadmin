<template>
  <!-- contactme 联系我-我是红娘 -->
  <div>
    <vPageTitle vtitle="推广图"></vPageTitle>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="所在位置" width="120"></el-table-column>
      <el-table-column prop="time" label="更新日期" width="150"></el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <img :src="scope.row.contact" width="60%">
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="dnid(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出层 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <el-form-item label="所在位置">{{newcont.title}}</el-form-item>
        <el-form-item label="内容">
          <!-- <input type="file" id="upload" name="upload" @change="onChange"> -->
          <div class="box">
            <input id="1" type="file" @change="onChange">
            <label for="1"></label>
            <img :src="newcont.contact" v-if="newcont.contact">
            <i class="iconfont" v-else>选择图片</i>
          </div>
        </el-form-item>
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="newok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import uapi from "@/api/config";
import vPageTitle from "../common/pageTitle.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      newcont: "",
      tableData: []
    };
  },
  created() {
    this.newdata();
  },
  methods: {
    dnid(row) {
      //编辑
      // console.log(row);
      this.newcont = { ...row };
      this.dialogVisible = true;
    },
    newok() {
      //提交
      // console.log("aa");
      axios({
        url: uapi.contactedit,
        method: "post",
        data: {
          id: this.newcont.id,
          title: this.newcont.title,
          contact: this.newcont.contact
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("提交成功");
            this.dialogVisible = false;
          } else {
            this.$message.error("提交失败");
          }
        })
        .catch(err => {
          this.$message.error("提交失败" + err);
        });
    },
    onChange(e) {
      //图片赋值
      const _self = this;
      var files = e.target.files[0];
      var size = Math.floor(files.size / 1024); //计算图片尺寸
      if (size > 1024) {
        //图片大小超过提示
        this.$message.error("缩略图文件大小不得超过1m");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //  这个时候_self.avatar中存的就是编码过后的图片了
          _self.newcont.contact = this.result;
        };
      }
    },
    newdata() {
      //更新页面方法
      axios({
        url: uapi.contact,
        method: "post"
      })
        .then(res => {
          // console.log(response);
          // console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          this.$message.error("失败" + error);
        });
    }
  },
  components: {
    vPageTitle
  }
};
</script>

<style scoped>
.box {
  position: relative;
  border: 1px dashed #d9d9d9;
  width: 260px;
  height: 400px;
  overflow: hidden;
  text-align: center;
  line-height: 150px;
}
.box img {
  width: 100%;
}
input {
  position: absolute;
  left: -9999px;
}
/* 使label充满整个box*/
label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10; /* 这个z-index之后说到*/
}
</style>