<!-- 存储换算器-StorageConversion
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2023-01-04 20:22:00
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 20:22:07
-->
<!--  -->
<template>
  <div class="web_icon storageConversion">
    <div class="box photo" @click="openView">
      <div class="top">存储换算器</div>
    </div>
    <p class="app-item-title">{{ props.data.name }}</p>
    <JGdialog v-model="showDialog" :title="props.data.name">
      <detail></detail>
    </JGdialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import JGdialog from "@/components/modules/dialog/index.vue"; // 弹窗插件
import detail from "./details/index.vue"; // 详情
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
</script>

<style lang="scss" scoped>
.storageConversion {
  .box {
    width: 100%;
    height: 100%;
    color: black;
    display: flex;
    background-color: aquamarine;
    justify-content: center;
    align-items: center;
  }
}
</style>
