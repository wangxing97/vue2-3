<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  name: "Main",
  components: { Menu, CommonHeader },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
