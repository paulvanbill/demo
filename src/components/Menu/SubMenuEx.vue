<template>
  <el-submenu v-bind="menu" v-if="menu.type == 'submenu'">
    <template slot="title" v-if="menu.lable != null">
      <i :class="menu.icon" />
      <span>{{ menu.lable }}</span>
    </template>
    <template v-if="menu.childs != null">
      <template v-for="child in menu.childs">
        <el-menu-submenu-ex v-bind:menu="child"></el-menu-submenu-ex>
        <el-menu-item-ex v-bind:menu="child"></el-menu-item-ex>
      </template>
    </template>
  </el-submenu>
</template>

<script>
import MenuItemEx from "./MenuItemEx.vue";

export default {
  name: "el-menu-submenu-ex",
  props: {
    menu: Object //指定值的类型
  },
  components: {
    "el-menu-item-ex": MenuItemEx
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>