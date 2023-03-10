/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-15 22:51:14
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 19:44:52
 */
import { render, h } from "vue";
import RightClickMenu from "./index.vue";
import layout from "@/views/layout/index.vue";

// 服务式组件
const handleDestroy = () => {
  // 从 body 上移除组件
  render(null, document.body);
};

// 注册快捷键R
const registerKey = () => {
  document.onkeydown = (e) => {
    if (e.keyCode == 82) {
      unRegisterKey(); // 卸载快捷键
      refresh(); // 刷新页面
    }
  };
};
// 刷新页面的事件
export const refresh = () => {
  rightClickMenu.close();
  window.location.reload();
};
// 卸载快捷键
const unRegisterKey = () => {
  document.onkeydown = null;
};
export const rightClickMenu = {
  close: () => {
    unRegisterKey();
    handleDestroy();
  },
  open: (data: any, event: any, menuConfig: any) => {
    // 先调用close方法，关闭之前的组件
    rightClickMenu.close();
    registerKey(); // 注册快捷键
    const vnode = h(RightClickMenu, {
      data,
      menuConfig,
      event,
      destroy: handleDestroy,
    });
    render(vnode, document.body);
  },
  openEditForm: () => {
    layout.openEditForm();
  },
  // 添加应用
  addApp: () => {
    console.log("添加应用");
    // 访问layout组件的openEditForm方法
  },
};
