/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-17 15:35:14
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 21:06:20
 */
import { defineStore } from "pinia";
import { list } from "./appListConfig.js";
export const useAppList = defineStore("appList", {
  state: () => {
    return {
      appList: [
        {
          type: "addApp",
          name: "添加应用",
          id: "addApp",
          img: "https://files.codelife.cc/website/add.svg",
          url: "",
          layout: "1X1",
        },
      ],
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
    createApp(obj: any) {
      this.appList.push(obj);
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
