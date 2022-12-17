/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-17 15:35:14
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 17:11:49
 */
import { defineStore } from "pinia";
import { list } from "./appListConfig.js";
export const useAppList = defineStore("appList", {
  state: () => {
    return {
      appList: [],
    };
  },
  actions: {
    SETAPPLIST() {
      this.appList = list;
    },
    editLayout(id: string, layoutStr: string) {
      const index = this.appList.findIndex((item: any) => item.id === id);
      this.appList[index].layout = layoutStr;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: "appList",
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
