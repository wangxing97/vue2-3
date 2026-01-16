<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    @select="onSelect"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "Vue" : "Vue管理系统" }}</h3>
    <el-menu-item v-for="item in noChild" :index="item.name" :key="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChild" :index="item.name" :key="item.name">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="itemChild in item.children"
          :index="itemChild.name"
          :key="itemChild.name"
          >{{ itemChild.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonMenu",
  mounted() {
    this.$bus.$on("changeCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
  },
  data() {
    return {};
  },
  watch: {
    $route: {
      handler(to, from) {
        this.$store.commit("tab/setTabData", to.path.split("/")[1]);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onSelect(...params) {
      const path = this.getPath(params[0]);
      if (
        this.$route.path !== path &&
        !(this.$route.path == "/home" && path == "/")
      ) {
        //this.$store.commit("tab/setTabData", params[0]);
        this.$router.push(path);
      }
    },
    getPath(targetName, menuList = this.menuData) {
      // 遍历每一个菜单节点
      for (const item of menuList) {
        // 1. 当前节点的name匹配上，直接返回当前节点的url
        if (item.name === targetName) {
          return item.path;
        }
        // 2. 当前节点有children子节点，且children是数组，就递归查找子节点
        if (
          item.children &&
          Array.isArray(item.children) &&
          item.children.length
        ) {
          const result = this.getPath(targetName, item.children);
          // 递归找到结果就立即返回，找不到会返回null
          if (result) {
            return result;
          }
        }
      }
      // 遍历完所有节点都没找到，返回null
      return null;
    },
  },
  computed: {
    menuData() {
      return this.$store.state.tab.menuData;
    },
    noChild() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChild() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu {
  height: 1000px;
  // height: 100%;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    font-weight: 400;
    border-bottom: 1px solid #ccc;
  }
  border-right: none;
}
</style>
