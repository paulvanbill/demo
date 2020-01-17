<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      @select="handleSelect"
      :unique-opened="true"
      :collapse-transition="false"
      mode="vertical"
    >
      <template v-for="menu in menus">
        <el-menu-submenu-ex :menu="menu"></el-menu-submenu-ex>
        <el-menu-item-ex :menu="menu"></el-menu-item-ex>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SubMenuEx from "@/components/Menu/SubMenuEx.vue";
import MenuItemEx from "@/components/Menu/MenuItemEx.vue";
import variables from "@/styles/variables.scss";
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      menus: []
    };
  },
  components: {
    "el-menu-item-ex": MenuItemEx,
    "el-menu-submenu-ex": SubMenuEx
  },
  created() {
    this.getMenus();
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    getMenus() {
      this.menus.push(
        {
          index: "1",
          type: "submenu",
          lable: "菜单1",
          icon: "el-icon-message",
          childs: [
            {
              index: "1-1",
              type: "submenu",
              lable: "菜单1-1",
              icon: "el-icon-message",
              childs: [
                {
                  index: "1-1-1",
                  type: "item",
                  lable: "菜单1-1-1",
                  icon: "el-icon-message",
                  route: {
                    path: "/tabs",
                    name: "tabs"
                  }
                },
                {
                  index: "1-1-2",
                  type: "item",
                  lable: "菜单1-1-2",
                  icon: "el-icon-message",
                  route: {
                    path: "/table",
                    name: "table"
                  }
                }
              ]
            },
            {
              index: "1-2",
              type: "item",
              lable: "菜单1-2",
              icon: "el-icon-message"
            }
          ]
        },
        {
          index: "2",
          type: "submenu",
          lable: "菜单2",
          icon: "el-icon-message",
          childs: [
            {
              index: "2-1",
              type: "item",
              lable: "菜单2-1",
              icon: "el-icon-message",
              route: {
                path: '/index/helloworld',
                name: 'helloworld'
              }
            },
            {
              index: "2-2",
              type: "item",
              lable: "菜单2-2",
              icon: "el-icon-message",
              route: {
                path: '/index/table',
                name: 'table'
              }
            }
          ]
        },
        {
          index: "3",
          type: "item",
          lable: "菜单3",
          icon: "el-icon-message",
          route: {
            path: "/helloworld",
            name: "helloworld"
          }
        }
      );
    },
    handleSelect(key, keyPath, item) {
      if (item.route) {
        this.$router.push(item.route.path);
      }
    }
  }
};
</script>

<style>
</style>