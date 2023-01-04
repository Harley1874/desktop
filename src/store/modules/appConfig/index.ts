/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-25 21:00:38
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 19:49:09
 */
import { defineStore } from "pinia";
export const systemConfig = defineStore("systemConfig", {
  state: () => {
    return {
      systemConfig: {
        wallpaper: "d1b187s9xqc",
        firstRun: true,
      },
    };
  },
  actions: {
    setSystemConfig(obj: any) {
      this.systemConfig = obj;
    },
    // 初始化
    init() {
      this.systemConfig = {
        wallpaper: "0",
        firstRun: true,
      };
    },
    run() {
      this.systemConfig.firstRun = false;
    },
    setBgImg(img: string) {
      this.systemConfig.wallpaper = img || "0";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: "systemConfig",
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
