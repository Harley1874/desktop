/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 23:17:47
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-14 21:09:16
 */
import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getTokenName, getTokenValue } from "./utils/userToken.js";
import { useUserStore } from "@/store/modules/user";

//全局进度条的配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 1000, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 更改启动时使用的最小百分比
  parent: "body", //指定进度条的父容器
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});
