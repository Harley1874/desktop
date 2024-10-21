<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
const userToken = useUserStore();
const { tokenName, tokenValue } = storeToRefs(userToken);
console.log(
  "🚀 ~ file: HomeView.vue:14 ~ tokenName,tokenValue",
  tokenName,
  tokenValue
);
</script>

<template>
  <main>
    <h1>欢迎登录</h1>
    <TheWelcome />
  </main>
</template>
