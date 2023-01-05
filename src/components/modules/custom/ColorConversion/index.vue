<!-- 
 * @Descripttion: 颜色转换器-StorageConversion
 * @Author: 李峥
 * @Date: 2023-01-04 20:22:00
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-05 22:47:11
-->
<template>
  <div class="web_icon storageConversion">
    <div class="box photo" @click="openView">
      <div class="top">颜色转换器</div>
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
    color: #fff;
    display: flex;
    background-image: linear-gradient(-45deg, #fd45c5, #fcef76);
    justify-content: center;
    align-items: center;
  }
}
</style>
