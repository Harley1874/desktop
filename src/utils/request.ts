/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-03 00:36:48
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-16 23:49:37
 */
import axios from "axios";
import { getTokenName, getTokenValue, removeToken } from "./userToken.js";
import { ElMessage, ElMessageBox } from "element-plus";

import errorCode from "@/utils/errorCode";
declare module "axios" {
  interface AxiosResponse<T = any> {
    errorinfo: null;
    // 这里追加你的参数
    code: number;
    msg: string;
    data: T;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 15000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    const tokenName: string = getTokenName() || "";
    const tokenValue = getTokenValue();
    if (tokenValue && !isToken) {
      if (config.headers) {
        config.headers[tokenName] = tokenValue; // 让每个请求携带自定义token 请根据实际情况自行修改
      }
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              if (value[key] !== null && typeof value[key] !== "undefined") {
                let params = propName + "[" + key + "]";
                let subPart = encodeURIComponent(params) + "=";
                url += subPart + encodeURIComponent(value[key]) + "&";
              }
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log("reques error");
    Promise.reject(error);
  }
);
// code码规范详见https://www.teambition.com/project/615551dd6c5883b81707769c/app/5eba5fba6a92214d420a3219/workspaces/6155a7c054b1e00041a50849/docs/6166d3504e16830001b12af0
const matchingList = [
  20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 70004,
];
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res.data;
    // // 未设置状态码则默认成功状态
    // // code的类型为number外加string
    // let code: number | string = res.status;
    // if (res.data.code) {
    //   code = res.data.code;
    // } else {
    //   code = 1;
    // }
    // // 获取错误信息
    // const msg: string = res.data.msg || errorCode["default"];
    // code = Number(code);
    // if (
    //   code === 70004 ||
    //   code === 20001 ||
    //   code === 20007 ||
    //   code === 20008 ||
    //   code === 20015
    // ) {
    //   ElMessageBox.confirm(msg, "系统提示", {
    //     confirmButtonText: "登录",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //     customClass: "large-msg",
    //   })
    //     .then(() => {
    //       removeToken();
    //       location.href = "/login";
    //     })
    //     .catch(() => {});
    //   return Promise.reject(msg);
    // } else if (matchingList.indexOf(code) > -1 && code !== 70004) {
    //   ElMessage({
    //     message: msg,
    //     type: "error",
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(msg);
    // } else if (code === 10001) {
    //   // for 减签提示, 已经在页面里面做了处理了(流程中按钮操作错误)
    //   return Promise.reject(msg);
    // } else if (code == 20016) {
    //   return Promise.reject(msg);
    // } else if (code !== 1) {
    //   ElMessage({
    //     message: msg,
    //     type: "error",
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(msg);
    // } else {
    //   return res.data;
    // }
  },
  (error) => {
    let { message } = error;
    console.log(error.response);
    if (error.response && error.response.data && error.response.status == 400) {
      message = "参数异常 : ";
      error.response.data?.data?.forEach((element: { message: string }) => {
        message = message + element.message + " ; ";
      });
    } else if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    console.log("message", message);
    ElMessage({
      message: message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
