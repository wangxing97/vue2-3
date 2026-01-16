<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="small"
        @click="changeMenu"
      ></el-button>
      <span>13</span>
      <common-bread></common-bread>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar size="small" :src="userImg"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import userImg from "../images/user.jpg";
import CommonBread from "./CommonBread.vue";
export default {
  name: "CommonHeader",
  components: { CommonBread },
  data() {
    return {
      userImg,
    };
  },
  methods: {
    changeMenu() {
      //this.$bus.$emit("changeCollapse");
      this.$store.commit("tab/updateCollapse");
    },
  },
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    padding: 0 20px;
    display: flex;
    align-items: center;
    span {
      width: 20px;
      height: 20px;
      position: relative;
      color: #fff;
      background-color: red;
      border-radius: 50%;
      left: -20px;
      top: -10px;
      line-height: 18px;
    }
    .el-breadcrumb {
      margin-left: 10px;
      /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: gray;
        }
        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
        .el-breadcrumb__inner:hover {
          color: rgb(64, 158, 255);
          cursor: pointer;
        }
      }
    }
  }
  span {
    color: aliceblue;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content {
    .el-avatar {
      margin-right: 15px;
    }
  }
}
</style>
