<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-25 18:53:27
 * @LastEditors: 李峥
 * @LastEditTime: 2023-02-26 20:55:48
-->
<template>
  <div class="wallpaper-box">
    <ul class="wallpaper-list">
      <li
        class="wallpaper-item"
        @click="setBg('0')"
        :class="{ active: classCalc('0') }"
      >
        <div class="wallpaper-item-img">
          <img style="width: 100%; height: 100%" :src="bgImg" fit="fit" />
        </div>
        <div class="wallpaper-item-title">默认</div>
      </li>
      <li
        class="wallpaper-item"
        v-for="item in wallpaperList"
        @click="setBg(item.key)"
        :class="{ active: classCalc(item.key) }"
      >
        <div class="wallpaper-item-img">
          <img style="width: 100%; height: 100%" :src="item.base64" fit="fit" />
        </div>
        <div class="wallpaper-item-title">默认</div>
      </li>
      <li class="wallpaper-item upload" @click="upload">
        <div class="wallpaper-item-img">上传新壁纸</div>
        <div class="wallpaper-item-title"></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { systemConfig } from "@/store/modules/appConfig/index.js";
import { db } from "@/utils/db.js";
import bgImg from "@/assets/img/bgImg/bg.jpeg";
const pinia = systemConfig();

// 查询数据库中的所有数据
const wallpaperList: any = ref([]);
const getAllSql = () => {
  db.myWallpaper.toArray().then((res) => {
    const arr = res.sort((a: any, b: any) => {
      return a.id - b.id;
    });
    wallpaperList.value = arr;
  });
};
getAllSql();

const upload = () => {
  // 调起windows的选择文件
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.onchange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      let img = {
        key: Math.random().toString(36).substr(2),
        base64: e.target.result,
      };
      // 保存到数据库:indexDb
      db.myWallpaper.add(img).then((res) => {
        pinia.DBCHANGE();
        getAllSql();
      });
      // db.myWallpaper;
      console.log("🚀 db.myWallpaper", db.myWallpaper);
    };
  };
};

const setBg = (str: string) => {
  pinia.setBgImg(str);
};

// 计算选中壁纸的样式
const classCalc = (key: string) => {
  if (key == pinia.systemConfig.wallpaper) return true;
};
</script>

<style lang="scss" scoped>
.wallpaper-box {
  --magnification: 8;
  display: flex;
  .wallpaper-list {
    flex-wrap: wrap;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wallpaper-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(16px * var(--magnification));
      height: calc(9px * var(--magnification) + 40px);
      cursor: pointer;
      &:hover {
        .wallpaper-item-img::after {
          background-color: rgba($color: #000000, $alpha: 0.2);
        }
      }
      &.active {
        .wallpaper-item-img::after {
          background-color: rgba($color: #000000, $alpha: 0);
        }
      }
      .wallpaper-item-img {
        width: calc(16px * var(--magnification));
        height: calc(9px * var(--magnification));
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &::after {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba($color: #000000, $alpha: 0.4);
          transition: all 0.3s;
        }
      }
      .wallpaper-item-title {
        margin-top: 4px;
      }
    }
  }
}
.upload {
  cursor: pointer;
  color: #fff;
  .wallpaper-item-img {
    background: rgba($color: #000000, $alpha: 0.65);
    border: 1px #1890ff dashed;
  }
}
</style>
