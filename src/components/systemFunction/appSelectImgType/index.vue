<!--  -->
<template>
  <div class="selectImg">
    <div
      class="img-item"
      @click="selectTypeChange('0')"
      :class="{ active: selectType == '0' }"
    >
      <div
        class="img-box"
        :style="{ backgroundColor: props.imgColor || '#ccc' }"
      >
        <el-image
          style="width: 50px; height: 50px"
          :style="{
            '--el-fill-color-light': '#ccc',
            '--el-text-color-placeholder': '#fff',
          }"
          :src="props.url"
          fit="fit"
        />
      </div>
      <p>官方图标</p>
    </div>
    <div
      class="img-item"
      @click="selectTypeChange('1')"
      :class="{ active: selectType == '1' }"
    >
      <div
        class="img-box"
        :style="{ backgroundColor: props.imgColor || '#ccc' }"
      >
        <div class="img-item-text">
          <span class="text" :style="transformCalc">
            {{ props.imgText }}
          </span>
        </div>
      </div>
      <p>文字图标</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, nextTick } from "vue";
const props = defineProps<{
  url: string;
  imgText: string;
  imgColor: string;
}>();
const emit = defineEmits(["change"]);

// 图标文字
const imgText = ref("");
// 选中类型
const selectType = ref("");
const selectTypeChange = (val: string) => {
  selectType.value = val;
  emit("change", val);
};
// 计算缩放比例
const transformCalc = ref("transform: translate(-50%,-50%)");
watch(
  () => props.imgText,
  (val) => {
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
.text-name {
  margin-bottom: 10px;
}
.selectImg {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.img-item {
  height: 100px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.active {
    .img-box {
      border-color: #409eff;
      line-height: 0;
      box-shadow: 0 0 10px 0px rgb(187, 187, 187);
    }
  }
  .img-box {
    border: 2px solid #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  // 文字图标
  .img-item-text {
    width: 50px;
    height: 50px;
    font-size: 100%;
    color: #fff;
    position: relative;
    font-size: 22px;
    .text {
      white-space: nowrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
}
:deep(.el-image__wrapper) {
  border-radius: 10px;
  .el-image__error {
    border-radius: 10px;
  }
}
</style>
