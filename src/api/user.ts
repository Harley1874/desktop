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
