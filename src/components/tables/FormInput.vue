<template>
  <!-- 文章新建 -->
  <div>
    <vpageTitle vtitle="文章新建"></vpageTitle>
    <!-- 标题和简介 -->
    <el-form :label-position="labelPosition='top'" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="newdata.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="文章简介" placeholder="请输入文章简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="newdata.intro"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input v-model="newdata.tname" placeholder="王二小"></el-input>
      </el-form-item>
      <el-form-item label="作者头像(本地图片或者网络图片)">
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="box">
              <input id="0" type="file" @change="onChange0">
              <label for="0"></label>
              <img :src="newdata.nameimgs" v-if="newdata.nameimgs">
              <i class="iconfont" v-else>选择图片</i>
            </div>
          </el-col>
          <el-col :span="16">
            <el-input v-model="newdata.nameimgs" placeholder="请输入网络地址"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!--  -->
      <el-form-item label="缩略图">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="box">
              <input id="1" type="file" @change="onChange1">
              <label for="1"></label>
              <img :src="newdata.img1" v-if="newdata.img1">
              <i class="iconfont" v-else>选择图片</i>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box">
              <input id="2" type="file" @change="onChange2">
              <label for="2"></label>
              <img :src="newdata.img2" v-if="newdata.img2">
              <i class="iconfont" v-else>选择图片</i>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="box">
              <input id="3" type="file" @change="onChange3">
              <label for="3"></label>
              <img :src="newdata.img3" v-if="newdata.img3">
              <i class="iconfont" v-else>选择图片</i>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <!--  -->
    </el-form>
    <!-- 富文本编辑器 -->
    <div>正文</div>
    <quillEditor
      ref="myTextEditor"
      v-model="newdata.content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></quillEditor>
    <el-button type="primary" @click="bottom">提交</el-button>
  </div>
</template>

<script>
import axios from "axios";
import uapi from "@/api/config";
import vpageTitle from "@/components/common/pageTitle";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      newdata: {
        id: "", //文章id
        title: "", //标题
        intro: "", //简介
        tname: "", //文章作者
        nameimgs: "", //作者头像
        content: "", //文本编辑器内容
        img1: null,
        img2: null,
        img3: null
      }, //页面传参

      editorOption: {
        placeholder: "Hello World" //提示内容
      }
    };
  },
  methods: {
    onChange0(e) {
      //图片赋值
      // console.log(e);
      const _self = this;
      var files = e.target.files[0];
      var size = Math.floor(files.size / 1024); //计算图片尺寸
      if (size > 500) {
        //超过500k提示
        this.$message.error("缩略图文件大小不得超过500k");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //  这个时候_self.avatar中存的就是编码过后的图片了
          _self.newdata.nameimgs = this.result;
        };
      }
    },
    onChange1(e) {
      //图片赋值
      // console.log(e);
      const _self = this;
      var files = e.target.files[0];
      var size = Math.floor(files.size / 1024); //计算图片尺寸
      if (size > 500) {
        //超过500k提示
        this.$message.error("缩略图文件大小不得超过500k");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //  这个时候_self.avatar中存的就是编码过后的图片了
          _self.newdata.img1 = this.result;
        };
      }
    },
    onChange2(e) {
      //图片赋值
      // console.log(e);
      const _self = this;
      var files = e.target.files[0];
      var size = Math.floor(files.size / 1024); //计算图片尺寸
      if (size > 500) {
        //超过500k提示
        this.$message.error("缩略图文件大小不得超过500k");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //  这个时候_self.avatar中存的就是编码过后的图片了
          _self.newdata.img2 = this.result;
        };
      }
    },
    onChange3(e) {
      //图片赋值
      // console.log(e);
      const _self = this;
      var files = e.target.files[0];
      var size = Math.floor(files.size / 1024); //计算图片尺寸
      if (size > 500) {
        //超过500k提示
        this.$message.error("缩略图文件大小不得超过500k");
        return false;
      } else {
        if (!e || !window.FileReader) return; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function() {
          //  这个时候_self.avatar中存的就是编码过后的图片了
          _self.newdata.img3 = this.result;
        };
      }
    },

    bottom() {
      //新建提交
      axios({
        url: uapi.article,
        method: "post",
        data: {
          id: this.newdata.id,
          title: this.newdata.title,
          intro: this.newdata.intro,
          tname: this.newdata.tname,
          nameimgs: this.newdata.nameimgs,
          img1: this.newdata.img1,
          img2: this.newdata.img2,
          img3: this.newdata.img3,
          content: this.newdata.content
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$message.success("新建成功");
            this.$router.push({ name: "BasicTables" });
          }
        })
        .catch(error => {
          this.$message.error("新建失败" + error);
        });
    },

    //编辑器状态
    onEditorBlur(editor) {
      // console.log("失去焦点!", editor);
    },
    onEditorFocus(editor) {
      // console.log("获取焦点!", editor);
    },
    onEditorReady(editor) {
      // console.log("初始化完成!", editor);
    },
    editorOption() {
      // console.log("变更时!");
    },
    onEditorChange({ editor, html, text }) {
      // console.log("这是干啥");
      this.content = html;
    }
  },
  components: {
    quillEditor,
    vpageTitle
  }
};
</script>

<style scoped>
.box {
  position: relative;
  border: 1px dashed #d9d9d9;
  width: 260px;
  height: 150px;
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
  top: 35%;
  left: 35%;
  right: 0;
  bottom: 0;
  z-index: 10; /* 这个z-index之后说到*/
}
</style>