<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-15 22:49:37
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 22:38:52
-->
<template>
  <div>
    <div
      class="rightClickMenu"
      :style="{
        left: props.event.clientX + 'px',
        top: props.event.clientY + 'px',
      }"
    >
      <ul>
        <li v-for="item in menuConfig" @click="handel(item)">
          <component :style="iconStyle" :is="comParse(item.icon)"></component>
          <span class="text"
            >{{ item.name }}
            <span v-if="item.accelerator" class="tips">{{
              item.accelerator
            }}</span>
          </span>
        </li>
        <template v-if="false">
          <template v-if="!data.url">
            <li @click="createApp">
              <Plus :style="iconStyle" />
              <span class="text">
                添加应用
                <span class="tips">A</span>
              </span>
            </li>
          </template>
          <template v-if="data.url">
            <li @click="openWeb">
              <Position :style="iconStyle" />
              <span class="text"> 在新标签页打开 </span>
            </li>
            <li class="menu-item" @click="copyUrl">
              <Connection :style="iconStyle" />
              <span class="text"> 复制链接 </span>
            </li>
            <li>
              <EditPen :style="iconStyle" />
              <span class="text"> 编辑 </span>
            </li>
          </template>
          <template v-if="data.id">
            <li notHover>
              <EditPen :style="iconStyle" />
              <span class="text"> 布局 </span>
            </li>
            <div class="layout_box">
              <div
                v-for="item in layoutList"
                class="layout_item"
                :class="{
                  active: layoutActive(data),
                }"
                :layout="item.layout"
                @click="editLayout(data, item.layout)"
              >
                {{ item.name }}
              </div>
            </div>
          </template>

          <li @click="refreshBtn">
            <EditPen :style="iconStyle" />
            <span class="text">
              刷新
              <span class="tips">R</span>
            </span>
          </li>
          <li>
            <Delete :style="iconStyle" />
            <span class="text"> 删除 </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, markRaw, onMounted } from "vue";
import {
  rightClickMenu,
  refresh,
} from "@/components/modules/rightClickMenu/index.js";
import { toLowerCase } from "@/utils/index.js";
import {
  Position,
  Connection,
  EditPen,
  Delete,
  Plus,
  RefreshRight,
} from "@element-plus/icons-vue";
import { useAppList } from "@/store/modules/appList";
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  event: {
    type: Object,
    default: () => {},
  },
  menuConfig: {
    type: Array,
    default: () => [],
  },
});
const iconStyle = {
  width: "12px",
  height: "12px",
};
const pinia = useAppList();
const { data, event } = props;
const menuConfig: any = ref(props.menuConfig);

// 组件渲染
const comParse = (str: String) => {
  // 动态组件渲染
  switch (str) {
    case "Plus":
      return markRaw(Plus);
    case "RefreshRight":
      return markRaw(RefreshRight);
    case "EditPen":
      return markRaw(EditPen);
    case "Delete":
      return markRaw(Delete);
    default:
      return;
  }
};
// 组件方法  1. 调用传入的方法 2. 关闭右键菜单
const handel = (item: any) => {
  item.click(props.data);
  closeRightClickMenu();
};
// 注册快捷键模块 start
const registerShortcut = () => {
  document.onkeydown = (e) => {
    menuConfig.value.forEach((item: any) => {
      if (item.accelerator) {
        if (toLowerCase(e.key) == toLowerCase(item.accelerator)) {
          item.click();
          closeRightClickMenu();
        }
      }
    });
  };
};
// 卸载快捷键
const unRegisterShortcut = () => {
  document.onkeydown = null;
};
registerShortcut();
// 快捷键模块 end

const openWeb = () => {
  window.open(data.url);
  closeRightClickMenu();
};
const copyUrl = () => {
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", data.url);
  console.log("🚀 ~ file: index.vue:63 ~ copyUrl ~ data.url", data.url);
  document.body.appendChild(input);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    window.$msgSuccess("复制成功");
  }
  document.body.removeChild(input);
  closeRightClickMenu();
};
// 关闭弹窗
const closeRightClickMenu = () => {
  unRegisterShortcut();
  const destroy = rightClickMenu.close();
};
// 刷新页面
const refreshBtn = () => {
  refresh();
  closeRightClickMenu();
};
// 布局默认高亮
const layoutActive = (item: any) => {
  const { layout } = item;
  nextTick(() => {
    const dom = document.querySelector(".layout_item[layout='" + layout + "']");
    if (dom) dom.classList.add("active");
  });
};

const layoutList = [
  {
    name: "1X1",
    layout: "1X1",
  },
  {
    name: "1X2",
    layout: "1X2",
  },
  {
    name: "2X2",
    layout: "2X2",
  },
  {
    name: "2X1",
    layout: "2X1",
  },
  {
    name: "2X4",
    layout: "2X4",
  },
];
const editLayout = (item: any, editlayout: any) => {
  const { layout } = item;
  const dom = document.querySelector(".layout_item[layout='" + layout + "']");
  if (dom) dom.classList.remove("active");
  pinia.editLayout(item.id, editlayout);
};
// pinia.SETAPPLIST();
// 添加应用
const createApp = () => {
  closeRightClickMenu();
  // 访问子组件的openEdit方法
  rightClickMenu.addApp();
};
</script>

<style lang="scss" scoped>
.rightClickMenu {
  position: absolute;
  width: 160px;
  background-color: rgba($color: #000000, $alpha: 0.75);
  border-radius: 5px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 10px 0;
  // 背景模糊
  backdrop-filter: blur(10px);
  ul {
    flex: 1;
    li {
      color: rgba($color: #fff, $alpha: 0.9);
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      transition: all 0.3s;
      margin: 0 10px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      &:hover:not([notHover]) {
        color: #fff;
        background-color: rgba($color: #ffffff, $alpha: 0.1);
      }
      .text {
        position: relative;
        flex: 1 0 auto;
        margin-left: 4px;
        .tips {
          position: absolute;
          right: 8px;
          // 缩放
          transform: scale(0.85);
        }
      }
    }
  }
  p {
    font-size: 12px;
  }
}
.menu-item {
  .icon {
    width: 10px;
    height: 10px;
  }
}
// 布局
.layout_box {
  width: calc(100% - 40px);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .layout_item {
    min-width: 36px;
    height: 20px;
    line-height: 20px;
    margin-right: 4px;
    margin-bottom: 4px;
    background-color: #ffffff1a;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #fff3;
    }
    &.active {
      background-color: #ffffff4d;
    }
  }
}
</style>
