<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 21:24:09
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-14 21:45:32
-->
<!--  -->
<template>
  <div class="module timeDate">
    <div class="time">
      <span>{{ value.time }}</span>
    </div>
    <div class="date">
      <span class="fz16">{{ value.date }}</span>
      <span class="fz16">{{ filterWeek(value.week) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, reactive, defineComponent } from "vue";
let value = reactive({
  time: dayjs().format("HH:mm:ss"),
  date: dayjs().format("MM月DD日"),
  week: dayjs().format("d"),
});
setInterval(() => {
  value.time = dayjs().format("HH:mm:ss");
  value.date = dayjs().format("MM月DD日");
  value.week = dayjs().format("d");
}, 1000);
const filterWeek = (val: string) => {
  // 对象的索引类型是什么
  const objList: any = {
    "0": "星期日",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六",
  };
  return objList[val];
};
</script>

<style lang="scss" scoped>
.timeDate {
  padding-top: 20px;
  color: #fff;
  text-align: center;
  .time {
    font-size: 50px;
    color: #fff;
    text-align: center;
  }
  .date {
    span {
      font-size: 14px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
