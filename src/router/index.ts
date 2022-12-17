/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 22:59:43
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-05 19:26:53
 */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Layout from "@/views/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Layout,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView/index.vue"),
    },
    {
      path: "/debug",
      name: "debug",
      component: () => import("../views/debug/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
