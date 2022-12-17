/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-16 22:13:29
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 13:24:34
 */
import request from "@/utils/request.js";
const API_KEY = "5ff70bd5ba13e988f01f6dce9e8826f5";
const HF_KEY = "dbf14f48aa1d4dd98f93a0d22a7b00d7";
import qs from "qs";
// 获取用户所在城市
export function getCity() {
  return request({
    url: "https://restapi.amap.com/v3/ip?key=" + API_KEY,
    method: "get",
  });
}
// 获取用户所在城市的天气-实时天气预报
export function getWeather(query: any) {
  query.key = HF_KEY;
  const queryStr = qs.stringify(query);
  return request({
    url: "https://devapi.qweather.com/v7/weather/now?" + queryStr,
    method: "get",
  });
  // code: API状态码，具体含义请参考状态码,
  // updateTime 当前API的最近更新时间,
  // fxLink 当前数据的响应式页面，便于嵌入网站或应用,
  // now.obsTime 数据观测时间,
  // now.temp 温度，默认单位：摄氏度,
  // now.feelsLike 体感温度，默认单位：摄氏度,
  // now.icon 天气状况和图标的代码，图标可通过天气状况和图标下载,
  // now.text 天气状况的文字描述，包括阴晴雨雪等天气状态的描述,
  // now.wind360 风向360角度,
  // now.windDir 风向,
  // now.windScale 风力等级,
  // now.windSpeed 风速，公里/小时,
  // now.humidity 相对湿度，百分比数值,
  // now.precip 当前小时累计降水量，默认单位：毫米,
  // now.pressure 大气压强，默认单位：百帕,
  // now.vis 能见度，默认单位：公里,
  // now.cloud 云量，百分比数值。可能为空,
  // now.dew 露点温度。可能为空,
  // refer.sources 原始数据来源，或数据源说明，可能为空,
  // refer.license 数据许可或版权声明，可能为空,
}

// 和风天气
export function getWeather2(query: any) {
  query.key = HF_KEY;
  const queryStr = qs.stringify(query);
  return request({
    url: "https://devapi.qweather.com/v7/weather/7d?" + queryStr,
    method: "get",
  });
}
