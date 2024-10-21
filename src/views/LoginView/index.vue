<!--  -->
<template>
  <el-card class="box-card login-box">
    <div class="title">{{ systemTitle }}</div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
      @keyup.enter.native="submitForm(ruleFormRef)"
    >
      <el-form-item prop="account" label-width="0">
        <el-input v-model="ruleForm.account" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password" label-width="0">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item label="记住密码" prop="delivery" label-width="70">
        <el-switch v-model="ruleForm.remember" />
      </el-form-item>
      <el-form-item label-width="0">
        <el-button
          type="primary"
          class="submitLogin"
          @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { encryptAES } from "@/utils/cryptoAES.js";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
// 设置系统标题为环境变量中的VITE_APP_TITLE
const systemTitle: string = import.meta.env.VITE_APP_TITLE;
const ruleFormRef = ref<FormInstance>(); // 注册ref元素
const pinia = useUserStore();
const router = useRouter();
// 设置表单数据
let ruleForm = reactive({
  account: "",
  password: "",
  remember: false,
});
// 设置表单验证规则
let rules = reactive<FormRules>({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let obj = dataEncrypt(ruleForm);
      pinia.LOGIN(obj).then((res: any) => {
        router.push({ path: "/" });
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 数据加密
const dataEncrypt = (data: { account: string; password: string }) => {
  let obj = {
    account: "",
    password: "",
    loginType: 1,
  };
  obj.account = encryptAES(data.account);
  obj.password = encryptAES(data.password);
  return obj;
};
</script>

<style lang="scss" scoped>
.login-box {
  // 垂直剧中显示
  margin-left: 500px;
  width: 400px;
  height: 550px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(#000, 0.1);
  text-align: center;
  border: none;
  margin-top: 10vh;
  padding: 0 40px;
  padding-top: 60px;
  .title {
    font-size: 24px;
    color: #1890ff;
    margin-bottom: 40px;
  }
  .submitLogin {
    width: 100%;
  }
}
</style>
