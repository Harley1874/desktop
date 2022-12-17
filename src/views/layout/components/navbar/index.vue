<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-03 19:30:48
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 13:18:03
-->
<template>
  <div class="navbar">
    <div class="left">
      <div class="hamburger-container">
        <el-icon><Fold /></el-icon>
      </div>
      <span class="navbar-systemName">{{ title }}</span>
    </div>
    <div class="right">
      <div class="icon-item">
        <el-button type="primary" text>
          <el-badge :value="12" class="item">
            <el-icon size="20"><BellFilled /></el-icon>
          </el-badge>
        </el-button>
      </div>
      <div class="icon-item">
        <el-button type="primary" text @click.stop.capture="toggle">
          <el-icon><FullScreen /></el-icon>
        </el-button>
      </div>
      <el-button type="primary" text @click="loginout">退出登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
// 全屏组件
import { useFullscreen } from "@vueuse/core";
const { toggle } = useFullscreen();
const title = import.meta.env.VITE_APP_TITLE; // 系统名称
// pinia及路由
const store = useUserStore();
const router = useRouter();
// 退出系统
const loginout = () => {
  ElMessageBox.confirm("确认注销并退出系统吗？", "提示", {
    confirmButtonText: "确认退出",
    cancelButtonText: "取消",
    type: "warning",
    distinguishCancelAndClose: true,
    buttonSize: "default",
    // confirmButtonText: "Save",
    // cancelButtonText: "Discard Changes",
  })
    .then(() => {
      store
        .LOGOUT()
        .then((res) => {
          ElMessage.success("退出成功");
          router.push("/login");
        })
        .catch((err) => {
          ElMessage.error("退出失败");
        });
    })
    .catch(() => {});
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  width: 40px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.navbar {
  padding: 0 20px;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  box-shadow: 0 1px 10px rgba($color: #000000, $alpha: 0.07);
  &-systemName {
    margin-left: 10px;
    font-size: 16px;
    height: 28px;
    font-size: 26px;
    font-weight: bold;
    color: #333333;
    line-height: 28px;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .icon-item {
      --color: #0475de;
      cursor: pointer;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      &:hover {
        --color: #3691e5;
      }
    }
  }
}
</style>
