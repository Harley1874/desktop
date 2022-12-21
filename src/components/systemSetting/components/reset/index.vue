<!--  -->
<template>
  <div class="reset-box">
    <div class="title">重置设置</div>
    <div class="tips">恢复所有的设置项以及应用数据为初始状态</div>
    <div class="btn" @click="reset">重置</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useAppList } from "@/store/modules/appList";
import { ElMessageBox } from "element-plus";
const pinia = useAppList();
let a = ref("fasfsfa");
let b = reactive({});
const reset = () => {
  ElMessageBox.confirm("您确定要重置所有的设置跟应用数据吗？", "提示", {
    confirmButtonText: "确定重置",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      pinia.resetAppList();
    })
    .catch(() => {
      window.$msg("已取消重置");
    });
};
</script>

<style lang="scss" scoped>
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
