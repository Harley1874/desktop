<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-21 18:45:19
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-21 21:32:15
-->
<!--  -->
<template>
  <div class="">
    <div class="bottomLeft">
      <div class="icon-box" @click="openSetting">
        <el-icon><Setting /></el-icon>
      </div>
    </div>

    <GJdrawer v-model="settingDrawer"></GJdrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GJdrawer from "./components/drawer/index.vue";
// 设置抽屉
const settingDrawer = ref(false);
const openSetting = () => {
  settingDrawer.value = !settingDrawer.value;
};
</script>

<style lang="scss" scoped>
.bottomLeft {
  position: absolute;
  bottom: 10px;
  left: 10px;
  .icon-box {
    width: 36px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s;
    border-radius: 5px;
    &:hover {
      background-color: rgba($color: #fff, $alpha: 0.25);
      color: #fff;
    }
  }
}
</style>
