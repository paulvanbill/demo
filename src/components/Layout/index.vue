<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 左侧菜单栏 -->
    <sidebar class="sidebar-container" />
    <!-- 右侧主页面栏 -->
    <div class="hasTagsView main-container">
      <div>
        <navbar></navbar>
        <tag-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/Layout/Sidebar";
import navbar from "@/components/Layout/Navbar";
import appMain from "@/components/Layout/AppMain";
import tagView from "@/components/Layout/TagView";
import { mapState } from "vuex";

export default {
  components: { sidebar, navbar, appMain, tagView },
  computed: {
    ...mapState({
      sidebar: state => state.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

</style>