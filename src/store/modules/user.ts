/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-03 16:04:49
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-05 19:25:38
 */
import { defineStore } from "pinia";
import { login, getInfo, logout } from "@/api/user";
import { setTokenName, setTokenValue, removeToken } from "@/utils/userToken";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      tokenName: "",
      tokenValue: "",
      userInfo: {},
      menuList: [],
    };
  },
  actions: {
    SET_USERINFO(data: object) {
      this.userInfo = data;
    },
    SET_MENULIST(data: any) {
      this.menuList = data;
    },
    REMOVE_TOKEN() {
      this.tokenName = "";
      this.tokenValue = "";
      this.userInfo = {};
      this.menuList = [];
    },
    // 登录: 获取用户token信息,同时存入cookie和pinia中
    LOGIN(obj: any) {
      return new Promise((resolve, reject) => {
        login(obj).then((res) => {
          if (res.code == 1) {
            this.tokenName = res.data.tokenInfo.tokenName;
            this.tokenValue = res.data.tokenInfo.tokenValue;
            setTokenName(res.data.tokenInfo.tokenName);
            setTokenValue(res.data.tokenInfo.tokenValue);
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
    // 获取用户基本信息，存入pinia中
    GETINFO() {
      return new Promise((resolve, reject) => {
        getInfo().then((res) => {
          if (res.code == 1) {
            this.SET_USERINFO(res.data.userBo);
            this.SET_MENULIST(res.data.menuTreeBoList);
            resolve(res);
          } else {
            reject(res);
          }
        });
      });
    },
    // 退出系统
    LOGOUT() {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            if (res.code == 1) {
              this.REMOVE_TOKEN();
              removeToken();
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getTokenName(): string {
      return this.tokenName;
    },
    getTokenValue(): string {
      return this.tokenValue;
    },
    getUserInfo(): any {
      return this.userInfo;
    },
    getMenuList(): any {
      return this.menuList;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: "my_user",
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
