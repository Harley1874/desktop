<!-- 公共弹窗组件
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-21 21:50:50
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-21 21:51:01
-->
<template>
  <div>
    <teleport to="#dialog">
      <div class="dialog-mask" @click="close" v-if="props.modelValue"></div>
      <div class="dialog" v-if="props.modelValue">
        <div class="dialog-header">
          <div class="dialog-header-right">
            <div class="dialog-close icon-btn" @click="close">
              <el-icon size="20"><Close /></el-icon>
            </div>
          </div>
        </div>
        <div class="dialog-content">
          <div class="dialog-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue";
const emit = defineEmits(["update:modelValue", "close", "confirm"]);
// 接收v-model传递的值
const props = withDefaults(
  defineProps<{ modelValue: boolean; title: string }>(),
  {
    modelValue: false,
    title: "标题",
  }
);
const close = () => {
  emit("update:modelValue", false);
};
// 弹窗打开的时候，在body下创建空div，用以挂载dom使用，弹窗关闭的时候，移除该div
const div = document.createElement("div");
div.id = "dialog";
document.body.appendChild(div);
onBeforeUnmount(() => {
  document.body.removeChild(div);
});
</script>

<style lang="scss" scoped>
.dialog-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.dialog {
  position: fixed;
  width: 600px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  .dialog-header {
    position: absolute;
    top: 0;
    right: 10px;
    height: 40px;
    .dialog-header-right {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-btn {
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  .dialog-content {
    height: 100%;
    .dialog-body {
      height: 100%;
    }
  }
}
</style>
