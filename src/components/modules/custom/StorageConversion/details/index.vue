<!-- 存储换算器-弹窗详情
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2023-01-04 20:29:37
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 20:29:41
-->
<template>
  <div class="storageConversion-detail">
    <div class="top">
      <p>存储换算器</p>
    </div>
    <div class="main">
      <el-form label-width="120px">
        <el-form-item v-for="(item, i) in formArr" :label="item.name">
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="onSubmit(i)"> 转换 </el-button>
            </el-col>
            <el-col :span="3">
              <el-button @click="copyValue(item.value)"> 复制 </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// 定义接口类型
interface FormItem {
  key: string;
  name: string;
  value: string;
}
// 定义表单数据
const formArr = reactive(<FormItem[]>[
  { key: "B", name: "字节(B)", value: "" },
  { key: "KB", name: "千字节(KB)", value: "" },
  { key: "MB", name: "兆字节(MB)", value: "" },
  { key: "GB", name: "千兆字节(GB)", value: "" },
  { key: "TB", name: "太字节(TB)", value: "" },
  { key: "PB", name: "拍字节(PB)", value: "" },
  { key: "EB", name: "艾字节(EB)", value: "" },
]);

const onSubmit = (i: number) => {
  if (!formArr[i].value) {
    window.$msgError("请输入数字");
    return;
  }
  if (!Number(formArr[i].value)) {
    window.$msgError("您输入的数据有误，请输入数字");
    return;
  }
  for (let index = 0; index < formArr.length; index++) {
    if (index === i) {
      continue;
    }
    const val = Number(formArr[i].value);
    formArr[index].value = val * 1024 ** (i - index) + "";
  }
};
const copyValue = (value: string) => {
  if (value) {
    window.$copy(value);
  }
};
</script>

<style lang="scss" scoped>
.top {
  padding: 10px 20px;
  padding-top: 30px;
  font-size: 20px;
  color: #1890ff;
}
.main {
  margin-top: 30px;
}
.el-row {
  width: 100%;
  .el-col {
    padding-right: 10px;
  }
}
</style>
