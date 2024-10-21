<template>
  <div class="logo">
    <div class="photo">
      <el-avatar shape="square" :src="imgUrl" />
    </div>
    <span class="userName">
      {{ userName }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
let userMsg = storeToRefs(useUserStore());
const userName = userMsg.getUserInfo.value.realName;
const imgUrl =
  import.meta.env.VITE_APP_FILE_ACCESS_PATH +
  userMsg.getUserInfo.value.headIcon;
</script>

<style lang="scss" scoped>
.logo {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-right: 1px solid #dcdfe6;
  .photo {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .userName {
    font-size: 16px;
    color: #fff;
  }
}
</style>
