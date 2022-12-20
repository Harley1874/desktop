<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 21:45:59
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-20 13:15:00
-->
<!--  -->
<template>
  <div class="module scarch">
    <el-input
      v-model="input3"
      placeholder="输入并搜索"
      :style="{
        '--el-color-primary': color,
        '--el-border-radius-base': borderRadius,
        '--el-component-size': '40px',
      }"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="百度一下" style="width: 115px">
          <el-option label="百度" value="1" />
          <el-option label="必应" value="2" />
          <el-option label="谷歌" value="3" />
          <el-option label="github" value="4" />
          <el-option label="添加" value="5" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const input3 = ref("");
const select = ref("1");
// 获取css的--el-border-color变量
const color = ref("#dcdfe6");
const borderRadius = ref("100px");
</script>

<style lang="scss" scoped>
.scarch {
  margin: 0 auto;
  margin-top: 40px;
  text-align: center;
  width: 400px;
}
</style>
