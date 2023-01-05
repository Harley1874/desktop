<!-- 颜色转换器-弹窗详情
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2023-01-04 20:29:37
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-04 20:29:41
-->
<template>
  <div class="storageConversion-detail">
    <div class="top">
      <p>颜色转换器</p>
    </div>
    <div class="main">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        @submit.native.prevent
      >
        <el-form-item label-width="20" prop="inputValue">
          <el-row>
            <el-col :span="12">
              <el-input
                v-model="ruleForm.inputValue"
                placeholder="请输入色值"
                @keyup.enter.native.stop="submitForm(ruleFormRef)"
              />
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="submitForm(ruleFormRef)">
                转换
              </el-button>
            </el-col>
          </el-row>
          <p class="tips">
            请输入色值(<span class="color">16进制，rgba</span>)
          </p>
        </el-form-item>
      </el-form>
      <el-table class="table" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="颜色格式" width="250" />
        <el-table-column prop="value" label="转换结果" min-width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="copyValue(scope.row.value)"
            >
              {{ scope.row.value }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { colorConversion } from "./colorConversion.js";
// 定义接口类型
interface FormItem {
  inputValue: string;
}
// 定义表单dom元素
const ruleFormRef = ref<FormInstance>();
// 定义表单数据
const ruleForm = reactive<FormItem>({
  inputValue: "",
});

// 输入的数据映射
interface Rules {
  [key: string]: RegExp;
}
const colorMap: Rules = {
  sezhi: /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,
  rgba: /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d{0,1})\)$/,
  rgb: /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
};
// 定义表单校验规则-是否为颜色
const validatePass = (rule: any, value: any, callback: any) => {
  const keys = Object.keys(colorMap);
  let flag = false;
  for (let i = 0; i < keys.length; i++) {
    const key: keyof Rules = keys[i];
    if (colorMap[key].test(value)) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    callback(new Error("请输入正确的色值"));
  } else {
    callback();
  }
};
// 定义表单校验规则
const rules = reactive<FormRules>({
  inputValue: [
    { required: true, message: "请输入色值", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
});
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    // 验证通过
    if (valid) {
      // 判断输入项是否为16进制色值
      if (colorMap.sezhi.test(ruleForm.inputValue)) {
        interface colorType {
          [key: string]: string;
        }
        const color: colorType = colorConversion(ruleForm.inputValue);
        Object.keys(color).forEach((key) => {
          tableDataSource[key] = color[key];
        });
      } else if (colorMap.rgba.test(ruleForm.inputValue)) {
        // rgba色值
        window.$msgError("目前仅支持16进制,例如：#ffffff, #fff", 3000);
      } else {
        window.$msgError("目前仅支持16进制,例如：#ffffff, #fff", 3000);
      }
    }
  });
};

// 定义表格数据
interface tableData {
  name: string;
  value: string;
}
// 定义索引的数据类型
interface tableDataSourceType {
  [key: string]: string;
}
// 表格元数据
const tableDataSource = reactive<tableDataSourceType>({
  hex: "",
  rgb: "",
  argb: "",
  rgba: "",
  hsl: "",
  hsv: "",
  keyword: "",
});
const tableToName = reactive<tableDataSourceType>({
  hex: "hex色值",
  rgb: "rgb色值",
  argb: "argb色值",
  rgba: "rgba色值",
  hsl: "hsl色值",
  hsv: "hsv色值",
  keyword: "关键字",
});
// 计算表格数据
const tableData = computed<tableData[]>(() => {
  interface tableData {
    name: string;
    value: string;
  }
  let arr: tableData[] = [];
  Object.keys(tableDataSource).forEach((key: keyof tableDataSourceType) => {
    if (!tableToName[key]) return;
    let obj = {
      name: tableToName[key],
      value: tableDataSource[key],
    };
    arr.push(obj);
  });
  return arr;
});
// 复制色值
const copyValue = (value: string) => {
  console.log("🚀 ~ file: index.vue:174 ~ copyValue ~ value", value);
  window.$copy(value);
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
.tips {
  margin-left: 10px;
  font-size: 12px;
  .color {
    color: #67c23a;
  }
}
.table {
  width: calc(100% - 40px);
  padding: 20px;
  padding-top: 0;
}
</style>
