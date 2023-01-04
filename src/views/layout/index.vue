<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 21:05:22
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 20:24:21
-->
<template>
  <div
    class="layout"
    @click="closeRightMenu"
    @contextmenu.prevent="rightClick"
    :style="{ backgroundImage: backgroundBase64 }"
  >
    <div class="left-scroll"></div>
    <div class="fixed-top">
      <dateTime class="component time"></dateTime>
      <search></search>
    </div>
    <div class="content">
      <div class="modules-page">
        <draggable
          item-key="id"
          :list="pinia.appList"
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
              :is="comRender(element.componentsName)"
              :data="element"
              :class="toClassName(element)"
              :ref="`component${element.id}`"
              :componentsId="element.id"
              @click="clickCustomComponent(element)"
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
      draggable
      lock-scroll
      custom-class="dialog"
      top="0"
      @close="closeEditAddPop"
    >
      <editAddVue
        v-if="centerDialogVisible"
        @submit="submit"
        @cancel="closeEditAddPop"
        :data="rightData"
      ></editAddVue>
    </el-dialog>
    <systemSetting></systemSetting>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, watch } from "vue";
import draggable from "vuedraggable";
import { deepClone } from "@/utils/index.js";
import dateTime from "@/components/modules/dateTime/index.vue";
import search from "@/components/modules/search/index.vue";
import folder from "@/components/modules/custom/Folder/index.vue";
import systemSetting from "@/components/systemSetting/index.vue";
// 小组件
import weather from "@/components/modules/custom/Weather/index.vue"; // 天气组件
import memorandum from "@/components/modules/custom/Memorandum/index.vue"; // 备忘录组件
import storageConversion from "@/components/modules/custom/StorageConversion/index.vue"; // 存储换算器
import smallWeb from "@/components/modules/small_web/index.vue"; // 小网页组件
import editAddVue from "@/components/modules/small_web/editAdd.vue"; // 小网页-编辑新值组件
import { rightClickMenu } from "@/components/modules/rightClickMenu/index.js";
// 计算class样式
import { toClassName } from "./utils.js";
import { isValidKey } from "@/utils/index.js";
import { useAppList } from "@/store/modules/appList.js";

// indexedDB数据库-读取壁纸
import { db } from "@/utils/db.js";
import { systemConfig } from "@/store/modules/appConfig/index.js";
const appConfig = systemConfig();
const pinia = useAppList();

// 设置壁纸 start
let wallpaperList: any = [];
const backgroundBase64 = ref('url("/src/assets/img/bgImg/bg.jpeg")');
db.myWallpaper.toArray().then((res) => {
  wallpaperList = res.sort((a: any, b: any) => {
    return a.id - b.id;
  });
  let wallpaperKey = appConfig.systemConfig.wallpaper;
  setWallpaper(wallpaperKey);
});

const setWallpaper = (str: string) => {
  if (str == "0") {
    backgroundBase64.value = 'url("/src/assets/img/bgImg/bg.jpeg")';
  } else {
    backgroundBase64.value =
      "url(" +
      wallpaperList.find((item: any) => {
        return item.key === str;
      }).base64;
    +")";
  }
};

watch(
  () => appConfig.systemConfig.wallpaper,
  (key: string) => {
    if (key) {
      setWallpaper(key);
    }
  }
);

// 设置壁纸 end
// 右键菜单 start
let data: any = {};
let rightData: any = ref({});
const closeRightMenu = () => {
  rightClickMenu.close();
};
const menuList = {
  layout: [
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
  ],
  app: [
    {
      name: "在新标签页中打开",
      icon: "Position",
      click: (obj: any) => {
        if (obj.url) {
          window.open(obj.url);
        } else {
          console.log("没有url");
        }
      },
    },
    {
      name: "复制链接",
      icon: "Connection",
      click: (obj: any) => {
        if (obj.url) {
          const input = document.createElement("input");
          input.setAttribute("readonly", "readonly");
          input.setAttribute("value", obj.url);
          document.body.appendChild(input);
          input.select();
          if (document.execCommand("copy")) {
            document.execCommand("copy");
            window.$msgSuccess("复制成功");
          }
          document.body.removeChild(input);
        } else {
          console.log("没有url");
        }
      },
    },
    {
      name: "布局",
      icon: "Layout",
      type: "submenu",
      options: [
        { name: "1X1", layout: "1X1" },
        { name: "1X2", layout: "1X2" },
        { name: "2X1", layout: "2X1" },
        { name: "2X2", layout: "2X2" },
        { name: "2X4", layout: "2X4" },
      ],
    },
    {
      name: "编辑",
      icon: "EditPen",
      click: (obj: any) => {
        rightData.value = obj;
        openEditForm();
      },
    },
    {
      name: "删除",
      icon: "Delete",
      click: (obj: any) => {
        if (obj.id) {
          pinia.deleteApp(obj.id);
        } else {
          console.log("没有id");
        }
      },
    },
  ],
  addApp: [
    {
      name: "布局",
      icon: "Layout",
      type: "submenu",
      options: [
        { name: "1X1", layout: "1X1" },
        { name: "1X2", layout: "1X2" },
        { name: "2X1", layout: "2X1" },
        { name: "2X2", layout: "2X2" },
        { name: "2X4", layout: "2X4" },
      ],
    },
    {
      name: "编辑",
      icon: "EditPen",
      click: (obj: any) => {
        rightData.value = obj;
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
  ],
  systemApp: [
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
  ],
};
const menuConfig = ref(menuList.layout);
const rightClick = (event: any) => {
  // 获取当前点击的元素,判断是document还是组件
  const target = event.target;
  // 若点击的是layout
  let eventId = getComponentInfo(target);
  // 右键点击的是空白区域
  if (eventId == "layout") {
    data.componentsName = "layout";
    menuConfig.value = menuList.layout;
  } else {
    // 点击的是组件
    // 获取点击的组件id
    // 根据组件的id获取组件信息
    data = deepClone(pinia.appList).find((item: any) => {
      return item.id == eventId;
    });
    menuConfig.value = parseRightClickMenu(data) || menuList.layout;
  }
  rightClickMenu.open(data, event, menuConfig.value);
};
// 根据右键点击的内容,渲染不同的右键菜单
const parseRightClickMenu = (component: any) => {
  const key: string = component.type;
  if (!isValidKey(key, menuList)) {
    throw new Error("未知的组件类型");
  }
  return menuList[key];
};
// 递归获取组件信息
const getComponentInfo: any = (target: any) => {
  if (target.className == "layout") {
    return "layout";
  } else {
    if (target.getAttribute("componentsId")) {
      return target.getAttribute("componentsId");
    } else {
      return getComponentInfo(target.parentNode);
    }
  }
};
// 右键菜单 end

// 组件渲染
const comRender = (str: String) => {
  // 动态组件渲染
  switch (str) {
    case "weather":
      return markRaw(weather);
    case "folder":
      return markRaw(folder);
    case "memorandum":
      return markRaw(memorandum);
    case "storageConversion":
      return markRaw(storageConversion);
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
const submit = (val: any, isEdit: boolean) => {
  // 此处为编辑
  if (isEdit == true) {
    let obj = {
      ...rightData.value,
      ...val,
    };
    pinia.editApp(obj);
  } else {
    let obj = {
      ...val,
    };
    pinia.createApp(obj);
  }
  rightData.value = {};
  centerDialogVisible.value = false;
};
const closeEditAddPop = () => {
  // 初始化rightData的数据
  rightData.value = {};
  centerDialogVisible.value = false;
};
// 组件点击事件-->官方组件打开弹窗
const JGdialogData = ref({
  name: "",
});
const showDialog = ref(false);
const clickCustomComponent = (element: any) => {
  console.log("layout页面打开");
  if (element.componentsName !== "smallWeb") {
    showDialog.value = true;
    JGdialogData.value = element;
    return false;
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .el-overlay-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.layout {
  width: 100vw;
  height: 100vh;
  background: no-repeat fixed;
  background-image: url("../../assets/img/bgImg/bg.jpeg");
  background-size: 100% auto;
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
