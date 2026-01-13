<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <div class="left">
        <el-card shadow="hover">
          <div class="user">
            <img src="../images/user.jpg" alt="" />
            <div class="userInfo">
              <h3>Admin</h3>
              <p>超级管理员</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>上次登陆时间：<span>2026-01-12</span></p>
            <p>上次登陆地点：<span>济南</span></p>
          </div>
        </el-card>
        <el-card shadow="hover">
          <el-table :data="tableData" show-summary stripe>
            <el-table-column
              v-for="item in columnData"
              :key="item.name"
              :prop="item.name"
              :label="item.label"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>

    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          shadow="hover"
        >
          <i
            :class="`el-icon-${item.icon}`"
            :style="{ 'background-color': item.color }"
          ></i>
          <div class="detail">
            <p class="value">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px" shadow="hover"></el-card>
      <div class="graph">
        <el-card shadow="hover"></el-card>
        <el-card shadow="hover"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api/index";
export default {
  name: "Home",
  mounted() {
    getData().then((data) => {
      const respData = data.data.data;
      this.tableData = respData.tableData;
      this.columnData = respData.columnData;
      this.countData = respData.countData;
    });
  },
  data() {
    return {
      tableData: [],
      columnData: [],
      countData: [],
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 35px;
  }
  .userInfo {
    h3 {
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #999;
    }
  }
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.loginInfo {
  p {
    line-height: 28px;
    font-size: 12px;
    color: #999;
    span {
      color: #666;
      margin-left: 50px;
    }
  }
}
.left .el-card:nth-child(2) {
  height: auto;
}
.left .el-card:not(:first-of-type) {
  margin-top: 20px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 10px;
  }
  i {
    width: 65px;
    height: 65px;
    font-size: 25px;
    color: #fff;
    text-align: center;
    align-content: center;
  }
  .detail {
    align-content: center;
    .value {
      font-size: 22px;
    }
    .desc {
      font-size: 12px;
      color: #999;
    }
    margin-left: 10px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-card {
    height: 260px;
    width: 48%;
  }
}
</style>
