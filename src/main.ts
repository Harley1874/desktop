/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 22:59:43
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 19:40:30
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
app.config.globalProperties.$msgSuccess = msgSuccess;
// window 添加全局方法
declare global {
  interface Window {
    $msgSuccess: any;
  }
}
window.$msgSuccess = msgSuccess;

app.use(store).use(router).use(ElementPlus).mount("#app");
