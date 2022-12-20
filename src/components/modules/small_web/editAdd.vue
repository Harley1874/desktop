<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-19 20:11:58
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-20 17:19:53
-->
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
        placeholder="Https://"
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
    <el-form-item label="图标颜色">
      <el-color-picker v-model="ruleForm.color" />
    </el-form-item>
    <el-form-item label="图标文字" v-if="ruleForm.imgType == '1'">
      <el-input
        v-model="ruleForm.imgText"
        maxlength="6"
        placeholder="请输入图标文字"
      />
    </el-form-item>
    <el-form-item label="">
      <appSelectImgType
        :url="ruleForm.img"
        :type="ruleForm.imgType"
        :imgText="ruleForm.imgText"
        :imgColor="ruleForm.color"
        @change="changeImgType"
      ></appSelectImgType>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="submitForm(ruleFormRef, 'submit')">
        确定并关闭
      </el-button>
      <el-button type="default" @click="submitForm(ruleFormRef, 'close')">
        取消并关闭
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, watch } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Link, EditPen } from "@element-plus/icons-vue";
import { deepClone } from "@/utils";
import appSelectImgType from "@/components/systemFunction/appSelectImgType/index.vue";

const emit = defineEmits(["submit", "cancel"]);

// 表单dom
const ruleFormRef = ref<FormInstance>();

// 编辑
const isEdit = ref(false);
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
// 表单数据
let ruleForm: any = ref({
  url: "",
  name: "",
  color: "",
  imgText: "",
});
// 存在id，则为编辑
if (props.data.id) {
  isEdit.value = true;
  ruleForm.value = deepClone(props.data);
}
// 弹窗表单验证
const rules = reactive<FormRules>({
  url: [
    {
      required: true,
      message: "请输入地址",
      trigger: "blur",
    },
    {
      // 是否包含www.
      pattern: /^(www\.)?/,
      message: "请输入正确的地址",
      trigger: "change",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入名称",
      trigger: "change",
    },
  ],
  // color: [
  //   {
  //     required: true,
  //     message: "请选择颜色",
  //     trigger: "change",
  //   },
  // ],
});

// 表单提交
const submitForm = async (formEl: FormInstance | undefined, type: string) => {
  if (type == "close") {
    // resetForm(formEl);
    emit("cancel");
    return;
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // emit提交至父组件
      let obj = {
        id: Math.random().toString(36).substr(2),
        componentsName: "small_web",
        layout: "1X1",
        type: "app",
        ...ruleForm.value,
      };
      // 默认属性
      const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
      if (!reg.test(obj.url)) {
        obj.url = "https://" + obj.url;
      }
      emit("submit", obj, isEdit.value);
      // 删除弹窗的数据
      // resetForm(formEl);
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 获取图标
const getHttpIcon = () => {
  let str = "https://favicon.cccyun.cc/";
  let url = ruleForm.value.url;
  const reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
  if (!reg.test(url.url)) {
    url = "https://" + url;
  }
  str += url;
  ruleForm.value.img = str;
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const changeImgType = (type: string) => {
  ruleForm.value.imgType = type;
  if (type == "1") {
    // getHttpIcon();
  }
};

// 将打开弹窗的方法暴露出去
</script>
<style lang="scss" scoped></style>
