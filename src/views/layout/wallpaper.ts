/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-25 21:17:40
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-25 21:20:02
 */

// 读取壁纸数据库：indexedDB
import { db } from "@/utils/db.js";
export const getWallpaperList = () => {
  db.open().then((res) => {
    // 读取数据
    console.log("连接数据库");
  });
};
