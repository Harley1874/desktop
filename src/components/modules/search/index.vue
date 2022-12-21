<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 21:45:59
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-21 18:07:06
-->
<!--  -->
<template>
  <div class="module scarch">
    <el-autocomplete
      class="scarch-autocomplete"
      v-model="input3"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      clearable
      placeholder="输入并搜索"
      @select="handleSelect"
      @keyup.enter.native.stop="search"
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
        </el-select>
      </template>
    </el-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { jsonp } from "vue-jsonp";
const input3 = ref("");
const select = ref("1");
// 获取css的--el-border-color变量
const color = ref("#dcdfe6");
const borderRadius = ref("100px");
const search = () => {
  if (select.value == "1") {
    window.open("https://www.baidu.com/s?wd=" + input3.value);
  } else if (select.value == "2") {
    window.open("https://cn.bing.com/search?q=" + input3.value);
  } else if (select.value == "3") {
    window.open("https://www.google.com/search?q=" + input3.value);
  } else if (select.value == "4") {
    window.open("https://github.com/search?q=" + input3.value);
  }
  return false;
};
const querySearch = (queryString: string, cb: Function) => {
  let url = "http://suggestion.baidu.com/su?wd=" + queryString;
  jsonp(url);
  window.baidu = {
    sug: (data: any) => {
      const arr = data.s.map((item: any) => {
        return { value: item, link: "https://www.baidu.com/s?wd=" + item };
      });
      cb(arr);
    },
  };
};

const handleSelect = (item: any) => {
  search();
};
</script>

<style lang="scss" scoped>
.scarch {
  margin: 0 auto;
  margin-top: 40px;
  text-align: center;
  width: 460px;
  ::v-deep {
    .scarch-autocomplete {
      width: 100%;
    }
  }
}
</style>
