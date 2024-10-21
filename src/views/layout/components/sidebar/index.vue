<template>
  <div class="sidebar">
    <logo bgColor="{'--bg-color': '#304156'}"></logo>
    <el-menu
      active-text-color="rgb(64, 158, 255)"
      background-color="#304156"
      text-color="rgb(191, 203, 217)"
      class="el-menu-vertical-demo"
      :style="{ '--bg-color': '#304156' }"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import logo from "../logo/index.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
// scss变量: var(--bg-color)
.sidebar {
  width: 200px;
  background-color: #304156;
  overflow: hidden;
}
</style>
