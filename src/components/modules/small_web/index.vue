<template>
  <div class="web_icon" :layout="props.data.layout" @click="openWeb">
    <div class="photo" :style="{ backgroundColor: props.data.color }">
      <!-- undefined/0: 图片 1: 文字 -->
      <template v-if="!props.data.imgType || props.data.imgType == '0'">
        <img :src="props.data.img" />
      </template>
      <template v-else>
        <div class="img-item-text">
          <span class="text" :style="transformCalc">
            {{ props.data.imgText }}
          </span>
        </div>
      </template>
    </div>
    <p class="app-item-title">{{ props.data.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
// 父页面像本页面传值
const props = defineProps(["data"]);
const openWeb = () => {
  if (props.data.url) {
    window.open(props.data.url, "_blank");
  } else {
    console.log("没有url");
  }
};
const getHttpIcon = () => {
  console.log("获取图标");
};
// 计算缩放比例
const transformCalc = ref("transform: translate(-50%,-50%)");
watch(
  () => props.data.imgText,
  (val) => {
    if (!val) return;
    console.log(val);
    nextTick(() => {
      let boxWidth = document.querySelector(".img-item-text");
      let textWidth = boxWidth?.querySelector(".text");
      if (boxWidth && textWidth) {
        let boxWidthNum = boxWidth.clientWidth;
        // 获取文本的宽度
        let textWidthNum = textWidth.scrollWidth;
        if (boxWidthNum < textWidthNum) {
          let scale = boxWidthNum / textWidthNum;
          transformCalc.value = `transform: translate(-50%,-50%) scale(${scale})`;
        } else {
          transformCalc.value = `transform: translate(-50%,-50%) scale(1)`;
        }
      }
    });
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.img-item-text {
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #fff;
  position: relative;
  .text {
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>
