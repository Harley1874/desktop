<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-05 19:26:19
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-05 19:29:52
-->
<!--  -->
<template>
  <div class="">
    <video
      autoplay
      preload="auto"
      src="blob:https://ke.qq.com/b17c619c-a837-4868-957f-600255cdc9e3"
    ></video>
    <el-button @click="download">下载</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";
let a = ref("fasfsfa");
let b = reactive({});

let blobUrl = "blob:https://ke.qq.com/b17c619c-a837-4868-957f-600255cdc9e3";
// 根据bloburl下载文件
const download = () => {
  downloadFile(blobUrl);
};
const downloadFile = (url: string) => {
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "test.mp4";
  a.click();
};
</script>

<style lang="scss" scoped>
video {
  border: 1px solid red;
}
</style>
