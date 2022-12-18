<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-03 17:21:35
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 20:41:32
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
        <draggable
          item-key="id"
          :list="list"
          ghost-class="ghost"
          chosen-class="chosenClass"
          animation="300"
          group="article"
          class="modules-block"
          filter=".folder"
          handle=".drag"
          :move="onMove"
        >
          <template #item="{ element }">
            <component
              :is="comParse(element.componentsName)"
              :data="element"
              :class="element.componentsName === 'folder' ? 'folder' : 'drag'"
            ></component>
          </template>
        </draggable>
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      :title="dialogTitle"
      width="30%"
      center
    >
      <editAddVue @submit="submit"></editAddVue>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted, nextTick, watch } from "vue";
import draggable from "vuedraggable";
import dateTime from "@/components/modules/dateTime/index.vue";
import search from "@/components/modules/search/index.vue";
import folder from "@/components/modules/custom/Folder/index.vue";
// 小组件
import weather from "@/components/modules/custom/Weather/index.vue"; // 天气组件
import smallWeb from "@/components/modules/small_web/index.vue"; // 小网页组件
import editAddVue from "@/components/modules/small_web/editAdd.vue"; // 小网页-编辑新值组件
import { rightClickMenu } from "@/components/modules/rightClickMenu/index.js";
import { useAppList } from "@/store/modules/appList.js";
const pinia = useAppList();
let list = ref(pinia.appList);
watch(
  () => pinia.appList,
  (val) => {
    console.log("🚀 ~ file: index.vue:69 ~ val", val);
    list.value = val;
  }
);
// 右键菜单 start
const data = {};
const closeRightMenu = () => {
  rightClickMenu.close();
};
const menuConfig = ref([
  {
    name: "添加应用",
    icon: "Plus",
    accelerator: "A", // 快捷键
    click: () => {
      openEditForm();
    },
  },
  {
    name: "刷新",
    icon: "RefreshRight",
    accelerator: "R",
    click: () => {
      window.location.reload();
    },
  },
  {
    name: "编辑",
    icon: "EditPen",
    click: () => {
      openEditForm();
    },
  },
  {
    name: "删除",
    icon: "Delete",
    click: () => {
      console.log("删除");
    },
  },
]);
const rightClick = (event: any) => {
  rightClickMenu.open(data, event, menuConfig);
};
// 右键菜单 end

// 组件渲染
const comParse = (str: String) => {
  // 动态组件渲染
  switch (str) {
    case "weather":
      return markRaw(weather);
    case "folder":
      return markRaw(folder);
    default:
      return markRaw(smallWeb);
  }
};
// 禁止拖拽文件夹 start
const onMove = (e: any) => {
  if (
    e &&
    e.relatedContext &&
    e.relatedContext.element &&
    e.relatedContext.element.componentsName &&
    e.relatedContext.element.componentsName == "folder"
  ) {
    return false;
  }
  return true;
};
// 禁止拖拽文件夹 end

// 弹窗 start
const dialogTitle = ref("添加应用");
const centerDialogVisible = ref(false);
const openEditForm = () => {
  centerDialogVisible.value = true;
};
// 弹窗的确定按钮
const submit = (val: any) => {
  if (dialogTitle.value == "添加应用") {
    // 此处为添加应用的逻辑
    const obj = {
      ...val,
      componentsName: "smallWeb",
      // id为完全随机
      id: Math.random().toString(36).substr(2),
      layout: val.layout || "1*1",
      name: val.name,
      type: "app",
      url: val.url,
    };
    pinia.createApp(obj);
  } else {
  }

  centerDialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
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
