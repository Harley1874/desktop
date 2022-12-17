/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-03 16:31:40
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-03 21:08:12
 */
import request from "@/utils/request";
// 登录方法
export function login(data: any) {
  return request({
    url: "/base/login/withPwd",
    headers: {
      isToken: true,
    },
    method: "post",
    data: data,
  });
}
// 退出方法
export function logout() {
  return request({
    url: "/base/logout",
    method: "post",
  });
}
// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/base/user/userInfo",
    method: "get",
  });
}
