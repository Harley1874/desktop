<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-03 17:21:35
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 19:55:18
-->
<!--  -->
<template>
  <div class="layout" @click="closeRightMenu" @contextmenu.prevent="rightClick">
    <div class="left-scroll"></div>
    <div class="fixed-top">
      <dateTime class="component time"></dateTime>
      <search></search>
    </div>
    <div class="content">
      <div class="modules-page">
        <div class="modules-block">
          <template v-for="item in list">
            <component
              :is="comParse(item.componentsName)"
              :data="item"
            ></component>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, nextTick } from "vue";
import dateTime from "@/components/modules/dateTime/index.vue";
import search from "@/components/modules/search/index.vue";
// 小组件
import weather from "@/components/modules/custom/Weather/index.vue"; // 天气组件
import smallWeb from "@/components/modules/small_web/index.vue"; // 小网页组件
import { rightClickMenu } from "@/components/modules/rightClickMenu/index.js";

import { useAppList } from "@/store/modules/appList.js";
import { storeToRefs } from "pinia";

const pinia = useAppList();
const { appList }: any = pinia;
// pinia.SETAPPLIST();
let list = ref([
  {
    componentsName: "",
  },
]);
list.value = appList;
const subscribe = pinia.$subscribe(
  (mutation, state) => {
    list.value = state.appList;
  },
  { detached: false }
);
const data = {};
const closeRightMenu = () => {
  rightClickMenu.close();
};
const rightClick = (event: any) => {
  rightClickMenu.open(data, event);
};

// 组件渲染
const comParse = (str: String) => {
  // 动态组件渲染
  switch (str) {
    case "weather":
      return markRaw(weather);
    default:
      return markRaw(smallWeb);
  }
};
</script>

<style lang="scss" scoped>
// --icon-size: 60px;
// --icon-gap-y: 30px;
.layout {
  width: 100vw;
  height: 100vh;
  background: 100% auto no-repeat fixed center center;
  background-image: url("../../assets/img/bgImg/bg.jpeg");
}
.content {
  .modules-block {
    margin: 0 auto;
    margin-top: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    max-width: 1120px;

    position: relative;
    display: grid;
    padding-top: 2vh;
    user-select: none;
    grid-template-columns: repeat(auto-fill, 80px);
    grid-template-rows: repeat(auto-fill, 80px);
    grid-auto-flow: dense;
    box-sizing: border-box;
    justify-content: center;
    padding-bottom: 50px;
  }
}
</style>
