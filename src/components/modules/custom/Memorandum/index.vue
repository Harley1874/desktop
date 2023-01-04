<!-- 备忘录组件
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-21 21:55:28
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-21 21:55:31
-->
<template>
  <div class="web_icon memorandum">
    <div @click="openView">
      <div class="memorandum-box photo">
        <div class="top">备忘录</div>
        <div class="bottom">
          <template v-for="item in list">
            <div class="main-item">
              {{ item.title }}
            </div>
          </template>
        </div>
      </div>
      <p class="app-item-title">{{ props.data.name }}</p>
    </div>
    <JGdialog v-model="showDialog" v-if="showDialog" title="备忘录">
      <detail v-model="props.data.defaultValue"></detail>
    </JGdialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import JGdialog from "@/components/modules/dialog/index.vue"; // 弹窗插件
import detail from "./components/detail.vue"; // 详情
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
const showDialog = ref(false);
const openView = () => {
  showDialog.value = true;
};
// 计算列表数据，固定渲染3条
const list = computed(() => {
  let arr = [];
  if (props.data.defaultValue.length >= 3) {
    arr = props.data.defaultValue.slice(0, 3);
  } else {
    for (let i = 0; i < 3; i++) {
      let obj = props.data.defaultValue[i] || { title: "" };
      arr.push(obj);
    }
  }
  return arr;
});
</script>

<style lang="scss" scoped>
.memorandum-box {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  text-align: center;
  .top {
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    background-image: linear-gradient(0deg, #f3bb14, #f39b04);
  }
  .bottom {
    flex: 1;
    font-size: 14px;
    .main-item {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px dotted #ccc;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
