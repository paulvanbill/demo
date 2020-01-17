<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <span class="home-title">My Demo</span>
    </el-header>
    <el-container>
      <el-aside class="home-aside" width="20%">
        <!-- 菜单栏 -->
        <template>
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="handleSelect"
            :unique-opened="true"
          >
            <template v-for="menu in menus">
              <el-menu-submenu-ex :menu="menu"></el-menu-submenu-ex>
              <el-menu-item-ex :menu="menu"></el-menu-item-ex>
            </template>
          </el-menu>
        </template>
      </el-aside>
      <el-main>
        <!-- svg -->
        <svg
          :class="{'is-active':isActive}"
          class="hamburger"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
        >
          <path
            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
            fill="blue"
          />
        </svg>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
        </el-breadcrumb>

        <!-- tabs -->
        <router-link tag="span" to="home" class="tags-view-item">
          dashboard少時誦詩書
          <span class="el-icon-close"></span>
        </router-link>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="height: 5%;">
      <span class="footer-span">this is footer</span>
    </el-footer>
  </el-container>
</template>

<script>
import SubMenuEx from "../components/Menu/SubMenuEx.vue";
import MenuItemEx from "../components/Menu/MenuItemEx.vue";

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
              icon: "el-icon-message"
            },
            {
              index: "2-2",
              type: "item",
              lable: "菜单2-2",
              icon: "el-icon-message"
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
        this.$router.push(item.route.name);
        //this.$router.push(item.route.path);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.home-header {
  background-color: #20a0ff;
  color: rgb(15, 15, 15);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  padding: 0px;
}

.home-title {
  color: #fff;
  font-size: 22px;
  display: inline;
  margin-left: 8px;
}

.home-aside {
  background-color: #ececec;
}

.el-aside .el-menu {
  height: 100%;
}

.home-container .el-footer {
  background-color: #12b649;
  color: rgb(173, 12, 12);
  position: relative;
  text-align: center;
}

.footer-span {
  position: absolute;
  top: 20%;
}
</style>

<style lang="scss" scoped>
.el-icon-close {
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform-origin: 100% 50%;
  &:before {
    transform: scale(0.6);
    display: inline-block;
    vertical-align: -3px;
  }
  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}

.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  &:first-of-type {
    margin-left: 15px;
  }
  &:last-of-type {
    margin-right: 15px;
  }
  &.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}
</style>