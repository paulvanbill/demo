<template>
  <el-menu-item v-bind="menu" v-if="menu.type == 'item'">
      <template>
          <i :class="menu.icon" />
          <span>{{ menu.lable }}</span>
      </template>
  </el-menu-item>
</template>

<script>
export default {
    name: 'el-menu-item-ex',
    props: {
        menu: Object
    },
    data() {
        return {}
    }
}
</script>

<style>

</style>