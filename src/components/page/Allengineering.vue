<template>
  <div>
    <vPageTitle vtitle="VIP会员"></vPageTitle>
    <!-- 会员查询 -->
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="phonenumber" label="电话"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="vip">
        <template slot-scope="scope">
          <div v-if="scope.row.vip=='Y'">
            <el-tag type="success">VIP</el-tag>
          </div>
          <div v-else>
            <el-tag type="info">非vip</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="modify(scope.row)">操作</el-button>
          <el-button type="warning" @click="userdele(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出层 -->
    <el-dialog title="新登记点" :visible.sync="dialogVisible" width="60%">
      <!--  -->
      <el-form :label-position="labelPosition='top'" label-width="80px">
        <div style="height:20rem;width:15rem;margin:0 auto;">
          <img :src="newrow.nameimg" width="100%">
        </div>
        <!-- 用户名 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">用户名</div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="newrow.name" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 性别 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">性别</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-radio v-model="newrow.sex" label="男">男</el-radio>
                <el-radio v-model="newrow.sex" label="女">女</el-radio>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 出生日期 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">出生日期</div>
            </el-col>
            <el-col :span="12">
              <div class="block">
                <el-date-picker v-model="newrow.born" type="date" placeholder="选择日期"></el-date-picker>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 年龄 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">年龄</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.age" placeholder="请选择">
                  <el-option v-for="item in agefunct()" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 身高 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">身高</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.height" placeholder="请选择">
                  <el-option v-for="item in arr.height" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 体重 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">体重</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.weight" placeholder="请选择">
                  <el-option v-for="item in arr.weight" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 星座 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">星座</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.conset" placeholder="请选择">
                  <el-option v-for="item in arr.conset" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 属相 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">属相</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.singz" placeholder="请选择">
                  <el-option v-for="item in arr.singz" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 血型 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">血型</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.blood" placeholder="请选择">
                  <el-option v-for="item in arr.blood" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 民族 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">民族</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.natia" placeholder="请选择">
                  <el-option v-for="item in arr.natia" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 工作单位 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">工作单位</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.employer" placeholder="请选择">
                  <el-option v-for="item in arr.employer" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 学历 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">学历</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.education" placeholder="请选择">
                  <el-option v-for="item in arr.education" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 籍贯所在 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">籍贯所在</div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="newrow.location" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 婚姻状况 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">婚姻状况</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.marrige" placeholder="请选择">
                  <el-option v-for="item in arr.marrige" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 手机 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">手机</div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="newrow.phonenumber" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 微信 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">微信</div>
            </el-col>
            <el-col :span="12">
              <el-input v-model="newrow.weixin" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 月薪 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">月薪</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.salary" placeholder="请选择">
                  <el-option v-for="item in arr.salary" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 住房情况 -->
        <div class="row-col-box">
          <el-row>
            <el-col :span="6">
              <div class="row-col-text">住房情况</div>
            </el-col>
            <el-col :span="12">
              <div class="row-col-cont">
                <el-select v-model="newrow.housing" placeholder="请选择">
                  <el-option v-for="item in arr.housing" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 文本框 -->
        <el-row>
          <el-col :span="6">
            <div class="row-col-text">用户介绍</div>
          </el-col>
          <el-col :span="14">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="newrow.lntroduc"></el-input>
          </el-col>
        </el-row>
        <br>
        <!-- 文本框 -->
        <el-row>
          <el-col :span="6">
            <div class="row-col-text">管理员备注</div>
          </el-col>
          <el-col :span="14">
            <el-input type="textarea" :rows="2" placeholder="用户不可见" v-model="newrow.remarks"></el-input>
          </el-col>
        </el-row>
        <!-- 是否VIP -->
        <el-row>
          <el-col :span="6">
            <div class="row-col-text">是否VIP</div>
          </el-col>
          <el-col :span="14">
            <el-select v-model="newrow.vip" placeholder="请选择">
              <el-option v-for="item in arr.vip" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--  -->
      </el-form>

      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dele()">修改</el-button>
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
    agefunct() {
      //年龄选择
      let arr = [];
      for (let index = 18; index < 50; index++) {
        arr.push(index);
      }
      return arr;
    },
    modify(row) {
      //查看
      this.dialogVisible = true;
      this.newrow = { ...row };
      // console.log(row);
    },
    dele() {
      //修改用户
      if (panduan()) {
        // console.log("修改一次");
        this.$axios({
          method: "post",
          url: uapi.menberedit,
          data: {
            admin_id: this.$store.state.user,
            grade: this.$store.state.grade,
            id: this.newrow.id,
            nameimg: this.newrow.nameimg,
            name: this.newrow.name,
            sex: this.newrow.sex,
            born: this.newrow.born,
            age: this.newrow.age,
            height: this.newrow.height,
            weight: this.newrow.weight,
            conset: this.newrow.conset,
            singz: this.newrow.singz,
            blood: this.newrow.blood,
            natia: this.newrow.natia,
            employer: this.newrow.employer,
            education: this.newrow.education,
            location: this.newrow.location,
            marrige: this.newrow.marrige,
            phonenumber: this.newrow.phonenumber,
            weixin: this.newrow.weixin,
            salary: this.newrow.salary,
            housing: this.newrow.housing,
            lntroduc: this.newrow.lntroduc,
            remarks: this.newrow.remarks,
            vip: this.newrow.vip
          }
        })
          .then(res => {
            // console.log(res);
            if (res.data.status == 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.newlib();
              this.dialogVisible = false;
            } else {
              this.$message("修改失败" + res.data.message);
            }
          })
          .catch(err => {
            this.$message("修改失败" + err);
          });
      }

      // }
    },
    userdele(row) {
      //删除用户
      axios({
        method: "post",
        url: uapi.deluer,
        data: {
          //发送管理员的标识给后台
          admin_id: this.$store.state.user,
          id: row.id,
          grade: this.$store.state.grade
        }
      })
        .then(res => {
          //获取后台 返回的信息
          // console.log(res);
          if (res.data.status == 1) {
            this.tableData = this.tableData.filter(function(i) {
              //过滤掉删除数据Id为真的
              return i.id != row.id;
            });
            this.$message("删除用户成功" + res.data.message);
          } else {
            this.$message("删除失败" + res.data.message);
          }
        })
        .catch(err => {
          this.$message("网络错误" + err);
        });
    },
    newlib() {
      //获取列表
      axios({
        method: "post",
        url: uapi.vmenber,
        data: {
          //发送管理员的标识给后台
          admin_id: this.$store.state.user,
          grade: this.$store.state.grade
        }
      })
        .then(res => {
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
    }
  },
  created() {
    this.newlib();
  },

  data() {
    return {
      tableData: [],
      arr: {
        height: [
          "160-165cm",
          "165-170cm",
          "170-175cm",
          "175-180cm",
          "180-185cm",
          "185-190cm"
        ],
        weight: [
          "40-45kg",
          "45-50kg",
          "50-55kg",
          "55-60kg",
          "60-65kg",
          "70-75kg",
          "80-85kg",
          "85kg以上"
        ],
        conset: [
          "金牛座",
          "双子座",
          "巨蟹座",
          "狮子座",
          "处女座",
          "天秤座",
          "天蝎座",
          "射手座",
          "摩羯座",
          "水瓶座",
          "双鱼座"
        ],
        singz: [
          "鼠",
          "牛",
          "虎",
          "兔",
          "龙",
          "蛇",
          "马",
          "羊",
          "猴",
          "鸡",
          "狗",
          "猪"
        ],
        blood: ["A型", "B型", "AB型", "O型", "其他型"],
        natia: ["汉族", "回族", "满族", "壮族", "其他少数民族"],
        employer: ["自由职业", "无业", "事业单位", "公务员", "私人企业"],
        education: ["小学", "初中", "高中", "大学", "博士"],
        marrige: ["单身", "离异"],
        salary: ["3000以下", "3千-6千", "6千-1万", "1-2万", "2万以上"],
        housing: ["有房", "无房", "自建"],
        vip: ["Y", "N"]
      },
      dialogVisible: false,
      newrow: {}
    };
  }
};
</script>

<style scoped>
.row-col-box {
  margin: 0.5rem 0;
}
.row-col-text {
  text-align: right;
  line-height: 2.5rem;
  padding-right: 1rem;
}
.row-col-cont {
  text-align: left;
  line-height: 2.5rem;
}
</style>
