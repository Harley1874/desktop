/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 23:24:57
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-02 23:27:14
 */
// 引入js-cookie
import Cookies from "js-cookie";
// 定义token的key
const TokenValue = "tokenValue";
const TokenName = "tokenName";
// 获取tokenName
export function getTokenName() {
  return Cookies.get(TokenName);
}
// 获取tokenValue
export function getTokenValue() {
  return Cookies.get(TokenValue);
}
// 设置tokenName
export function setTokenName(tokenName: string) {
  return Cookies.set(TokenName, tokenName);
}
// 设置tokenValue
export function setTokenValue(tokenValue: string) {
  return Cookies.set(TokenValue, tokenValue);
}
// 移除tokenName
export function removeToken() {
  Cookies.remove(TokenName);
  Cookies.remove(TokenValue);
}
