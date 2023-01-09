/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-25 21:00:38
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-09 21:46:01
 */
import { defineStore } from "pinia";
export const systemConfig = defineStore("systemConfig", {
  state: () => {
    return {
      systemConfig: {
        wallpaper: "0",
        firstRun: true,
      },
      // 数据库变化的标识
      dbChange: 0,
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
    // 壁纸数据库变化
    DBCHANGE() {
      this.dbChange++;
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
