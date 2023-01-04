/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 22:59:43
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 21:43:17
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./index.js";
import ElementPlus from "element-plus";
import "@/assets/style.scss";
import "element-plus/dist/index.css";
import "@/assets/style/element-variables.scss";
import "@/assets/style/webicon.scss";
import { ElMessage } from "element-plus";

// element图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
// element图标库 图标icon挂载
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// msgScccess挂载到全局
const msgSuccess = (msg: string, timer: number) => {
  ElMessage({
    message: msg,
    type: "success",
    duration: timer || 1500,
    showClose: true,
  });
};
const msgError = (msg: string, timer: number) => {
  ElMessage({
    message: msg,
    type: "error",
    duration: timer || 1500,
    showClose: true,
  });
};
const msg = (msg: string, timer: number) => {
  ElMessage({
    message: msg,
    type: "info",
    duration: timer || 1500,
    showClose: true,
  });
};
app.config.globalProperties.$msgSuccess = msgSuccess;
app.config.globalProperties.$msgError = msgError;
app.config.globalProperties.$msg = msg;
// window 添加全局方法
declare global {
  interface Window {
    $msgSuccess: any;
    $msgError: any;
    $msg: any;
    $copy: any;
    baidu: any;
  }
}
window.$msgSuccess = msgSuccess;
window.$msgError = msgError;
window.$msg = msg;
window.$copy = (text: string) => {
  const input = document.createElement("input");
  input.setAttribute("readonly", "readonly");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    window.$msgSuccess("复制成功");
  }
  document.body.removeChild(input);
};

app.use(store).use(router).use(ElementPlus).mount("#app");
