<template>
  <div>
    <vpageTitle vtitle="首页"></vpageTitle>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">新用户84人</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import vpageTitle from "@/components/common/pageTitle";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    vpageTitle
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 4rem;
  text-align: center;
  line-height: 4rem;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

