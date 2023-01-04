<script setup lang="ts">
import { RouterView } from "vue-router";
import { systemConfig } from "@/store/modules/appConfig/index.js";
import { useAppList } from "@/store/modules/appList.js";
const appConfig = systemConfig();
const pinia = useAppList();
if (appConfig.systemConfig.firstRun) {
  appConfig.run();
  pinia.resetAppList();
}
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
