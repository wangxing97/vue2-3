<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="small"
        @click="changeMenu"
      ></el-button>
      <span>首页</span>
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
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg,
    };
  },
  methods: {
    changeMenu() {
      //this.$bus.$emit("changeCollapse");
      console.log(this.$store);
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
