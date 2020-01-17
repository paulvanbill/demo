<template>
  <el-container class="tab-container">
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i>我的行程
          </span>
          我的行程
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {};
  }
};
</script>

<style>
.tab-container {
  background-color: aqua;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>