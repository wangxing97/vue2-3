<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="item.path">
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CommonBread",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    toPath(item) {
      const { path } = item;
      if (
        this.$route.path !== path &&
        !(this.$route.path == "/home" && path == "/")
      ) {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
