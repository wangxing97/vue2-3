<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-menu></common-menu>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <div class="tags">
            <el-tag
              v-for="tag in tags"
              :key="tag.name"
              :type="tag.path === $route.path ? '' : 'info'"
              @click="clickTag(tag)"
              @close="closeTag(tag)"
              closable
              :effect="tag.path === $route.path ? 'dark' : 'light'"
              size="small"
            >
              {{ tag.label }}
            </el-tag>
          </div>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonMenu from "../components/CommonMenu.vue";
import CommonHeader from "../components/CommonHeader.vue";
import { mapState } from "vuex";
export default {
  name: "Main",
  components: { CommonMenu, CommonHeader },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tags,
    }),
  },
  methods: {
    clickTag(tag) {
      this.$router.push(tag.path);
    },
    closeTag(tag) {
      // 只有一条的时候，回到首页
      if (this.tags.length === 1) {
        // 只有一条且是Home，不变
        if (this.$route.path !== "/home") {
          this.$store.commit("tab/setTagData", []);
          this.$router.push("/home");
        }
      } else {
        const index = this.tags.findIndex((item) => item.name === tag.name);
        this.$store.commit(
          "tab/setTagData",
          this.tags.filter((item) => item.name !== tag.name)
        );
        // 如果删除的是当前激活的
        if (tag.path === this.$route.path) {
          // 如果右边还有
          if (this.tags[index]) {
            this.$router.push(this.tags[index].name);
          } else {
            // 右边没有则路由左边
            this.$router.push(this.tags[index - 1].name);
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.tags {
  margin-bottom: 10px;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
