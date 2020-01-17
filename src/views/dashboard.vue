<template>
  <div>
    <span>this is dashboard</span>
    <el-input type="text" v-model="name" placeholder="请输入用户名" />
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style>

</style>