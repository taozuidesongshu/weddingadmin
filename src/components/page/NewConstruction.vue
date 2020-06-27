<template>
  <div>
    <vPageTitle vtitle="轮播图"></vPageTitle>
    <!-- <FormInput></FormInput> -->
    <!--  -->
    <el-button type="primary" @click="newlunbimg">新建轮播</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="bannername" label="图片名字"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="60%">
        </template>
      </el-table-column>
      <el-table-column prop="url" label="连接"></el-table-column>
      <el-table-column prop="time" label="更新日期"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="dnid(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="dele(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <!-- 修改弹出层 -->
    <el-dialog title="编辑轮播图" :visible.sync="dialogVisible" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <el-form-item label="图片名">
          <el-input v-model="newimg.bannername"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="box">
            <input id="1" type="file" @change="onChange">
            <label for="1"></label>
            <img :src="newimg.img" v-if="newimg.img">
            <i class="iconfont" v-else>选择图片</i>
          </div>
        </el-form-item>

        <el-form-item label="连接">
          <el-input v-model="newimg.url"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序">
          <el-input-number v-model="newimg.num1" :min="1" :max="5" label="描述文字"></el-input-number>
        </el-form-item>-->
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newok">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建弹出层 -->
    <el-dialog title="新建轮播图" :visible.sync="dialog" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <el-form-item label="图片名">
          <el-input v-model="newimg.bannername"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <div class="box">
            <input id="2" type="file" @change="onChange">
            <label for="2"></label>
            <img :src="newimg.img" v-if="newimg.img">
            <i class="iconfont" v-else>选择图片</i>
          </div>
        </el-form-item>

        <el-form-item label="连接">
          <el-input v-model="newimg.url"></el-input>
        </el-form-item>
        <!-- <el-form-item label="排序">
          <el-input-number v-model="newimg.num1" :min="1" :max="5" label="描述文字"></el-input-number>
        </el-form-item>-->
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="newtanceng">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import vPageTitle from "../common/pageTitle.vue";
import FormInput from "../tables/FormInput.vue";
import uapi from "@/api/config";

export default {
  data() {
    return {
      dialogVisible: false,
      dialog: false,
      newimg: {
        id: "",
        bannername: "",
        img: "",
        url: "",
        time: ""
      },
      tableData: []
    };
  },
  created() {
    this.newdata();
  },
  methods: {
    onChange(e) {
      //图片赋值
      const _self = this;
      var files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        //  这个时候_self.avatar中存的就是编码过后的图片了
        _self.newimg.img = this.result;
      };
    },
    dnid(row) {
      //编辑按钮
      // console.log(row);
      this.dialogVisible = true;
      this.newimg = row;
    },
    newok() {
      //修改弹层确认修改
      axios({
        url: uapi.modifylunbo,
        method: "post",
        data: {
          id: this.newimg.id,
          bannername: this.newimg.bannername,
          img: this.newimg.img,
          url: this.newimg.url,
          time: this.newimg.time
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: "获取成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.newdata();
          }
        })
        .catch(error => {
          this.$message.error("修改失败" + error);
          this.dialogVisible = false;
        });
    },
    newlunbimg() {
      //新建轮播
      let xinlunbo = {
        id: "",
        bannername: "",
        img: "",
        url: "",
        time: ""
      };
      this.newimg = xinlunbo;
      this.dialog = true;
    },
    newtanceng() {
      //新建轮播提交
      axios({
        url: uapi.newlunbo,
        method: "post",
        data: {
          bannername: this.newimg.bannername,
          img: this.newimg.img,
          url: this.newimg.url
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("新建成功");

            this.dialog = false;
            this.newdata();
          }
        })
        .catch(error => {
          this.$message.error("新建失败" + error);
          this.dialog = false;
        });
    },
    dele(row) {
      //删除接口
      axios({
        url: uapi.delelunbo,
        method: "post",
        data: {
          id: row.id
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("删除成功");
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });
          }
        })
        .catch(error => {
          this.$message.error("删除失败" + error);
        });
    },
    newdata() {
      //更新页面方法
      axios({
        url: uapi.lunbo,
        method: "get"
      })
        .then(res => {
          // console.log(response);
          // console.log(res.data.data);
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
    vPageTitle,
    FormInput
  }
};
</script>




<style scoped>
.el-col {
  margin-bottom: 16px;
}
.material-icons {
  font-size: 80px;
  color: #ddd;
}

.cart-string {
  height: 100px;
  padding-top: 10px;
  font-size: 1.1rem;
}
.box-card {
  font-size: 12px;
  line-height: 26px;
}
.box-card hr {
  height: 1px;
  border: none;
  border-top: 1px dashed #ccc;
  margin-bottom: 10px;
}
.el-select .el-input {
  width: 140px;
}
.box {
  position: relative;
  border: 1px dashed #d9d9d9;
  width: 400px;
  height: 260px;
  overflow: hidden;
  text-align: center;
  line-height: 260px;
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





