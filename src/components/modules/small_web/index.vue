<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-14 22:08:10
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 00:17:51
-->
<template>
  <div
    class="web_icon"
    @click="event"
    @contextmenu.prevent.stop="rightClick"
    :layout="props.data.layout"
    :class="layoutClass"
  >
    <!-- :style="layoutStyle" -->

    <div class="photo">
      <img :src="data.img" />
    </div>
    <p class="app-item-title">{{ data.name }}</p>
    <el-dialog
      v-model="dialogVisible"
      :title="popup.name"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="地址" prop="site">
          <el-input
            v-model="ruleForm.site"
            placeholder="请输入地址"
            :prefix-icon="Link"
          >
            <template #append>
              <el-button @click="getHttpIcon">获取图标</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入名称"
            :prefix-icon="EditPen"
          />
        </el-form-item>
        <el-form-item label="图标颜色" prop="color">
          <el-color-picker v-model="ruleForm.color" />
        </el-form-item>
        <el-form-item label="">
          <el-switch v-model="ruleForm.delivery" />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Link, EditPen } from "@element-plus/icons-vue";
import { rightClickMenu } from "@/components/modules/rightClickMenu/index.js";
// 父页面像本页面传值
const props = defineProps(["data"]);
let data = ref(props.data);
// const { data } = props;
// 监听data的变化，如果变化了，就重新计算布局
const event = () => {
  switch (data.type) {
    // 添加应用
    case "addApp":
      popup.name = "添加应用";
      dialogVisible.value = true;
      break;
    // 打开应用
    case "app":
      window.open(data.url);
      break;
    default:
      break;
  }
};
// 弹窗
const dialogVisible = ref(false); // 弹窗显示
const popup = reactive({
  name: "编辑", // 弹窗标题
});
const handleClose = () => {
  dialogVisible.value = false;
};
// 表单dom
const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  site: "",
  name: "Hello",
  color: "",
  delivery: false,
});
// 弹窗表单验证
const rules = reactive<FormRules>({
  site: [
    {
      required: true,
      message: "请输入地址",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "change",
    },
  ],
  color: [
    {
      required: true,
      message: "请选择颜色",
      trigger: "change",
    },
  ],
});
// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const rightClick = (event: any) => {
  const destroy = rightClickMenu.open(data, event);
};
const getHttpIcon = () => {
  console.log("获取图标");
};
watch(props, (nweProps, oldProps) => {
  console.log("🚀 ~ file: ", props.data.name, props.data.layout);
  computedClass();
});
const layoutClass = ref({});
const computedClass = () => {
  const arr = props.data.layout.split("*");
  const className = {
    "icon-size-1-1": arr[0] == 1 && arr[1] == 1,
    "icon-size-1-2": arr[0] == 1 && arr[1] == 2,
    "icon-size-2-1": arr[0] == 2 && arr[1] == 1,
    "icon-size-2-2": arr[0] == 2 && arr[1] == 2,
    "icon-size-2-4": arr[0] == 2 && arr[1] == 4,
  };
  layoutClass.value = className;
};
computedClass();
</script>

<style lang="scss" scoped></style>
