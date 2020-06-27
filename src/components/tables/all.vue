<template>
 <div>
   
<div class="inqu_Export">
 <el-button type="primary" @click="exportExcel">导出</el-button>
</div>
<el-card class="box-card">
  <el-table
  id="rebateSetTable"
    :data="engititle"
    style="width: 100%"
    :row-class-name="tablerowClassName"
    :default-sort = "{prop: 'Floor', order: 'descending'}"
     max-height="1000"
     
    >
    
    <el-table-column
      prop="projectname"
      label="工程名称"
       sortable
      >
      
    </el-table-column>
    <el-table-column
      prop="floor"
      label="层数"
       sortable>
    </el-table-column>
    <el-table-column
      prop="area"
      label="面积"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="工程地址">
    </el-table-column>
    <el-table-column
      prop="qualityname1"
      label="质量安全监督员1">
    </el-table-column>
    <el-table-column
      prop="qualityname2"
      label="质量安全监督员2">
    </el-table-column>
    <el-table-column
      prop="qualityname3"
      label="质量安全监督员3">
    </el-table-column>
    <el-table-column
      prop="qualityname4"
      label="质量安全监督员4">
    </el-table-column>
    <el-table-column
      prop="qualityname5"
      label="质量安全监督员5">
    </el-table-column>
    <el-table-column
      prop="putupsunit"
      label="建设单位">
    </el-table-column>
    <el-table-column
      prop="putupsmana"
      label="建设单位负责人">
    </el-table-column>
    <el-table-column
      prop="constructionunit"
      label="施工单位">
    </el-table-column>
    <el-table-column
      prop="constructionmana"
      label="施工单位负责人">
    </el-table-column>
    <el-table-column
      prop="designunit"
      label="设计单位">
    </el-table-column>
    <el-table-column
      prop="designmana"
      label="设计单位负责人">
    </el-table-column>
    <el-table-column
      prop="supervisionunit"
      label="监理单位">
    </el-table-column>
    <el-table-column
      prop="supervisionmana"
      label="监理单位负责人">
    </el-table-column>
    <el-table-column
      prop="surveyunit"
      label="勘察单位">
    </el-table-column>
    <el-table-column
      prop="surveymana"
      label="勘察单位负责人">
    </el-table-column>
    <!-- 一下是详细 -->
    <el-table-column
      label="报监手续"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.reportsupervisorradio}}</div>
       <div >时间:{{scope.row.reportsupervisortimm|formatDate}}</div>
       <div>结论:{{scope.row.reportsupervisorcertificate}}</div>
       <div>备注:{{scope.row.reportsupervisorremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="施工许可证"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.licenseradio}}</div>
       <div>时间:{{scope.row.licensetimm|formatDate}}</div>
       <div>结论:{{scope.row.licensecertificate}}</div>
       <div>备注:{{scope.row.licenseremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="文明工地创建"
      width="150"
      >
      <template slot-scope="scope">
       <div>级别:{{scope.row.civilizationradio}}</div>
       <div>时间:{{scope.row.civilizationtimm|formatDate}}</div>
       <div>结论:{{scope.row.civilizationcertificate}}</div>
       <div>备注:{{scope.row.civilizationremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="基础验收"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.basicacceptanceradio}}</div>
       <div>时间:{{scope.row.basicacceptancetimm|formatDate}}</div>
       <div>结论:{{scope.row.basicacceptancecertificate}}</div>
       <div>备注:{{scope.row.basicacceptanceremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="安全生产达标情况"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.safeproductionradio}}</div>
       <div>时间:{{scope.row.safeproductiontimm|formatDate}}</div>
       <div>结论:{{scope.row.safeproductioncertificate}}</div>
       <div>备注:{{scope.row.safeproductionremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="机械备案"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.mechanicalfilingradio}}</div>
       <div>时间:{{scope.row.mechanicalfilingtimm|formatDate}}</div>
       <div>结论:{{scope.row.mechanicalfilingcertificate}}</div>
       <div>备注:{{scope.row.mechanicalfilingremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="扬尘挂牌情况"
      width="150"
      >
      <template slot-scope="scope">
       <div>情况:{{scope.row.dustradio}}</div>
       <div>时间:{{scope.row.dusttimm|formatDate}}</div>
       <div>结论:{{scope.row.dustcertificate}}</div>
       <div>备注:{{scope.row.dustremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="主体检测"
      width="150"
      >
      <template slot-scope="scope">
       <div>合格1/0不合格:{{scope.row.subjectdetectionradio}}</div>
       <div>时间:{{scope.row.subjectdetectiontimm|formatDate}}</div>
       <div>结论:{{scope.row.subjectdetectioncertificate}}</div>
       <div>备注:{{scope.row.subjectdetectionremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="主体验收"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.mainexperienceradio}}</div>
       <div>时间:{{scope.row.mainexperiencetimm|formatDate}}</div>
       <div>结论:{{scope.row.mainexperiencecertificate}}</div>
       <div>备注:{{scope.row.mainexperienceremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="分户验收"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.householdacceptanceradio}}</div>
       <div>时间:{{scope.row.householdacceptancetimm|formatDate}}</div>
       <div>结论:{{scope.row.householdacceptancecertificate}}</div>
       <div>备注:{{scope.row.householdacceptanceremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="竣工验收"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.completionacceptanceradio}}</div>
       <div>时间:{{scope.row.completionacceptancetimm|formatDate}}</div>
       <div>结论:{{scope.row.completionacceptancecertificate}}</div>
       <div>备注:{{scope.row.completionacceptanceremarks}}</div>
        </template>
    </el-table-column> 
    <el-table-column
      label="竣工备案"
      width="150"
      >
      <template slot-scope="scope">
       <div>是1/0否:{{scope.row.completionrecordradio}}</div>
       <div>时间:{{scope.row.completionrecordtimm|formatDate}}</div>
       <div>结论:{{scope.row.completionrecordcertificate}}</div>
       <div>备注:{{scope.row.completionrecordremarks}}</div>
        </template>
    </el-table-column> 

   <el-table-column
      label="操作"
      width="100"
       fixed="right">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
        <br/>
        <el-button @click="deleteClick(scope.row)" type="primary" size="small">删除</el-button>
        
      </template>
    </el-table-column>
    
   
   
    
    
  </el-table>
</el-card>
</div>
</template>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .sucess-row {
  background: #f0f9eb;
}

.table-lib {
  color: red;
}
.inqu_Export {
  padding: 10px 0;
}
</style>

<script>
import vPageTitle from "../common/pageTitle.vue";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import uapi from "@/api/config";
export default {
  mounted: function() {
    this.$axios({
      method: "get",
      url: `${uapi}/index.php/Home/Api/portect_list`,
      params: {
        //发送管理员的标识给后台
        user_id: this.$store.state.user
      }
    })
      .then(res => {
        //获取后台 返回的信息

        if (res.data.status == 1) {
          this.engititle = res.data.data;
        } else {
          this.$message("获取信息失败" + res.data.message);
        }
      })
      .catch(err => {
        this.$message("获取信息失败" + err);
      });
  },
  methods: {
    tablerowClassName({ row, rowIndex }) {
      //每行的颜色渲染
      if (row.Completionrecordradio == 1) {
        //如果项目已经完工则显示绿色
        return "success-row";
      }
      return "warning-row";
    },
    exportExcel() {
      //导出到电子表格
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#rebateSetTable")
      );
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleClick(row) {
      //点击修改后把要修改的数据存到vuex

      this.$store.commit("modifyAdd", row);
      this.$router.push("/Modifyproject");
    },
    deleteClick(row) {
      // 删除
      this.$axios({
        method: "post",
        url: `${uapi}/index.php/Home/Api/portect_del`,
        data: {
          user_id: this.$store.state.user,
          id: row.id
        }
      })
        .then(res => {
          if (res.data.status == 1) {
            this.engititle = this.engititle.filter(function(i) {
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
    }
  },

  data() {
    return {
      engititle: [
        //所有工程
      ]
    };
  }
};
</script>





