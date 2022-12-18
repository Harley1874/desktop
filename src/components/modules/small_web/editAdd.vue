<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="地址" prop="url">
      <el-input
        v-model="ruleForm.url"
        placeholder="请输入地址"
        :prefix-icon="Link"
      >
        <!-- <template #append>
          <el-button @click="getHttpIcon">获取图标</el-button>
        </template> -->
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
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定并关闭
      </el-button>
      <el-button type="default" @click="submitForm(ruleFormRef)">
        取消并关闭
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Link, EditPen } from "@element-plus/icons-vue";

const emit = defineEmits(["submit", "cancel"]);

// 表单dom
const ruleFormRef = ref<FormInstance>();
// 表单数据
const ruleForm = reactive({
  url: "",
  name: "",
  color: "",
});
// 弹窗表单验证
const rules = reactive<FormRules>({
  url: [
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
      // emit提交至父组件
      emit("submit", ruleForm);
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 获取图标
const getHttpIcon = () => {
  console.log("获取图标");
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));

// 将打开弹窗的方法暴露出去
</script>
