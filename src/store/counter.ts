/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-02 22:59:43
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-03 17:42:59
 */
import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  let user = reactive({
    name: "张三",
    age: 18,
  });
  const SET_USER = (data: any) => {
    user = data;
  };
  return { count, doubleCount, increment, user, SET_USER };
});
