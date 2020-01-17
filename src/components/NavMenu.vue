<template>
  <el-container class="home-container">
    <el-header style="height: 50px">
      <span class="home_title">广东省分行</span>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu" />
              <span>菜单</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">
                <i class="el-icon-location" />
                <span>选项1</span>
              </template>
              <el-submenu index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu" />
                  <span>菜单1-1-1</span>
                </template>
                <el-menu-item index="1-1-1">选项1-1-1</el-menu-item>
              </el-submenu>
              <el-menu-item index="1-1-2">选项1-1-2</el-menu-item>
            </el-submenu>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
    <el-footer style="height: 50px">Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          id: 0,
          type: "submenu",
          lable: "系统",
          icon: "el-icon-location",
          route: {
            type: "inner",
            path: { name: "helloworld", params: { param1: "param1" } }
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
}

.el-header {
  background-color: #20a0ff;
  color: rgb(15, 15, 15);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;
  padding: 0px;
}

.el-footer {
  background-color: #12b649;
  color: rgb(173, 12, 12);
  text-align: center;
  line-height: 50px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 300px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>