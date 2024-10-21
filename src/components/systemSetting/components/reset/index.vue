<template>
  <div class="reset-box">
    <div class="reset-item">
      <div class="title">重置设置</div>
      <div class="tips">恢复所有的设置项为初始状态</div>
      <div class="btn" @click="reset">重置</div>
    </div>
    <div class="reset-item">
      <div class="title">恢复出厂设置</div>
      <div class="tips">恢复所有的设置项以及应用数据为初始状态</div>
      <div class="btn" @click="resetAll">恢复</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppList } from "@/store/modules/appList";
import { systemConfig } from "@/store/modules/appConfig/index.js";
import { ElMessageBox } from "element-plus";
import { db } from "@/utils/db.js";
const pinia = useAppList();
const appConfig = systemConfig();
const reset = () => {
  ElMessageBox.confirm("您确定要重置所有的设置跟应用数据吗？", "提示", {
    confirmButtonText: "确定重置",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      pinia.resetAppList();
      appConfig.init();
    })
    .catch(() => {
      window.$msg("已取消重置");
    });
};
const resetAll = () => {
  ElMessageBox.confirm("您确定要重置所有的设置吗？", "提示", {
    confirmButtonText: "确定重置",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 删除indexDB数据库
      indexDB_delete_library();
      appConfig.init();
    })
    .catch(() => {
      window.$msg("已取消重置");
    });
};

// indexDB_delete_library
const indexDB_delete_library = () => {
  db.myWallpaper.toArray().then(() => {
    db.myWallpaper.clear();
    appConfig.DBCHANGE();
    window.$msg("重置成功");
  });
};
</script>

<style lang="scss" scoped>
.reset-item {
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
}
.title {
  font-size: 14px;
}
.tips {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
.btn {
  margin-top: 10px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: rgba($color: #999, $alpha: 0.1);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba($color: #999, $alpha: 0.2);
  }
  &:focus {
    background-color: rgba($color: #999, $alpha: 0.2);
    color: #1890ff;
  }
}
</style>
