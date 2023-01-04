<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-21 18:47:15
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-25 19:06:45
-->
<template>
  <div class="right-drawer" :class="{ show: props.modelValue }">
    <div class="drawer-flex drawer-header">
      <div class="right">{{ list[listActive].title }}</div>
    </div>
    <div class="drawer-content">
      <div class="left">
        <div
          class="drawer-item"
          v-for="(item, i) in list"
          :class="{ active: listActive == i }"
        >
          <div class="tab-title" @click="listActive = i">{{ item.name }}</div>
        </div>
        <div class="tab-title-active-mask" :style="styleCalc"></div>
      </div>
      <div class="right">
        <div class="tab-main">
          <!-- 重置 -->
          <reset
            class="main-box"
            v-if="list[listActive].name == '重置'"
          ></reset>
          <wallpaper v-if="list[listActive].name == '壁纸'"></wallpaper>
        </div>
      </div>
    </div>
    <div class="close-icon" @click="closeDrawer" style="--size: 30px">
      <el-icon class="icon"><CloseBold /></el-icon>
    </div>
  </div>
  <div class="drawer-mask" v-if="props.modelValue" @click="closeDrawer"></div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits, nextTick, watch } from "vue";
import reset from "../reset/index.vue";
import wallpaper from "../wallpaper/index.vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue"]);
const closeDrawer = () => {
  emit("update:modelValue", false);
};
const list = reactive([
  {
    name: "壁纸",
    title: "壁纸",
    componentsName: "wallpaper",
  },
  {
    name: "重置",
    title: "重置设置",
    componentsName: "reset",
  },

  {
    name: "主题",
    title: "主题2",
    content: "saffas",
  },
]);
const listActive = ref(0);
const styleCalc = ref({});
watch(
  listActive,
  (val) => {
    nextTick(() => {
      const dom = document.querySelector(".drawer-item.active");
      if (dom) {
        const { width, height, top } = dom.getBoundingClientRect();
        styleCalc.value = {
          width: width + "px",
          height: height + "px",
          top: top + "px",
        };
      }
    });
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.right-drawer {
  --header-height: 30px;
  --left-width: 80px;
  width: 400px;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  right: -400px;
  top: 0;
  transition: all 0.3s;
  z-index: 1;
  font-size: 14px;
  padding: 10px 0 0 10px;
  .close-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: var(--size);
    height: var(--size);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($color: #000000, $alpha: 0.7);
    cursor: pointer;
    transition: all 0.3s;
    color: #fff;
    .icon {
      transition: all 0.3s ease-in-out;
      &:hover {
        // 旋转180度
        transform: rotate(180deg);
      }
    }
  }
  &.show {
    .close-icon {
      left: calc(0px - var(--size));
    }
    right: 0;
  }
  .drawer-header {
    padding-top: 10px;
    padding-left: calc(var(--left-width) + 10px);
    height: var(--header-height);
  }
  .drawer-content {
    margin-top: 20px;
    display: flex;
    height: calc(100vh - var(--header-height) - 30px);
    .left {
      width: var(--left-width);
      .tab-title-active-mask {
        position: absolute;
        background-color: rgba($color: #1890ff, $alpha: 0.2);
        border-radius: 4px;
        transition: all 0.3s;
        pointer-events: none;
      }
    }
    .right {
      margin-left: 10px;
      width: calc(100% - var(--left-width));
      background-color: #f1f0f5;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 10px;
    }
  }
}
.drawer-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.45);
  transition: all 0.3s;
}
.drawer-item {
  width: 100%;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-bottom: 4px;
  cursor: pointer;
  .tab-title {
    display: inline-block;
    width: var(--left-width);
    text-align: center;
    transition: all 0.3s;
    font-size: 12px;
    border-radius: 4px;
    &:hover {
      background-color: rgba($color: #000000, $alpha: 0.04);
    }
  }
  &.active {
    .tab-title {
      color: #1890ff;
    }
  }
}
.right {
  .tab-main {
    display: inline-block;
    width: 100%;
    .main-box {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 10px;
      border-radius: 4px;
    }
  }
}
</style>
