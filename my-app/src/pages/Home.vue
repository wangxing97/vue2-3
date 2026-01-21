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
      <el-card shadow="hover" class="centerGraph">
        <div ref="lineGraph" style="height: 260px"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <div ref="columnGraph"></div>
        </el-card>
        <el-card shadow="hover">
          <div ref="pieGraph"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
export default {
  name: "Home",
  mounted() {
    getData().then((data) => {
      // const respData = data.data.data;
      // this.tableData = respData.tableData;
      // this.columnData = respData.columnData;
      // this.countData = respData.countData;
      ({
        tableData: this.tableData,
        columnData: this.columnData,
        countData: this.countData,
        orderData: this.orderData,
        userData: this.userData,
        videoData: this.videoData,
        menuData: this.menuData,
      } = data.data.data);
      this.$store.commit("tab/setMenuData", this.menuData);
      // 初始化折线图
      this.initLineGraph();
      // 初始化柱状图
      this.initColumnGraph();
      // 初始化饼图
      this.initPieGraph();
    });
  },
  data() {
    return {
      tableData: [],
      columnData: [],
      countData: [],
    };
  },
  methods: {
    initLineGraph() {
      // 基于准备好的dom，初始化echarts实例
      const legend = Object.keys(this.orderData.data[0]);
      const series = legend.reduce((arr, current) => {
        arr.push({
          name: current,
          type: "line",
          data: this.orderData.data.map((item) => {
            return item[current];
          }),
        });
        return arr;
      }, []);
      const options = {
        title: {
          text: "品牌销量周趋势",
        },
        tooltip: {},
        legend: {
          data: legend,
        },
        xAxis: {
          data: this.orderData.date,
        },
        yAxis: {},
        series: series,
      };
      this.showGraph("lineGraph", options);
    },
    initColumnGraph() {
      const options = {
        title: {
          text: "新老用户对比",
        },
        legend: {
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: this.userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新用户",
            data: this.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "老用户",
            data: this.userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      this.showGraph("columnGraph", options);
    },
    initPieGraph() {
      const options = {
        title: {
          text: "销售占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          bottom: 10,
          itemWidth: 20,
        },
        series: [
          {
            name: "品牌",
            type: "pie",
            radius: "50%",
            data: this.videoData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      this.showGraph("pieGraph", options);
    },
    showGraph(refName, options) {
      const myChart = echarts.init(this.$refs[refName]);
      myChart.setOption(options);
    },
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
    .el-card__body {
      padding-top: 10px;
    }
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
/deep/.centerGraph {
  .el-card__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
/deep/.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-card {
    height: 260px;
    width: 48%;
    div {
      height: 260px;
    }
    .el-card__body {
      padding: 0 10px;
    }
  }
}
</style>
