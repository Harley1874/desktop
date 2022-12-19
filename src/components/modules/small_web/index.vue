<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 22:08:10
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-19 22:08:38
-->
<template>
  <div class="web_icon" :layout="props.data.layout">
    <div class="photo" :style="{ backgroundColor: props.data.color }">
      <template v-if="props.data.img">
        <img :src="props.data.img" />
      </template>
      <template v-else>
        <p class="icon-text">
          {{ props.data.name }}
        </p>
      </template>
    </div>
    <p class="app-item-title">{{ props.data.name }}</p>
  </div>
</template>

<script setup lang="ts">
// 父页面像本页面传值
const props = defineProps(["data"]);
const getHttpIcon = () => {
  console.log("获取图标");
};
</script>

<style lang="scss" scoped>
.icon-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
