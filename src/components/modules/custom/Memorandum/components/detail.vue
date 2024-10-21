<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-25 13:53:05
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-25 17:09:59
-->
<template>
  <div class="detail">
    <div class="detail-left">
      <el-scrollbar>
        <div
          class="detail-left-item"
          :class="{ active: item === activeItem }"
          v-for="item in props.modelValue"
          @click="active(item)"
        >
          <div class="info">
            <div class="title">
              {{ item.title || "无标题" }}
            </div>
            <div class="time">
              {{ item.updateTime }}
            </div>
          </div>
          <div class="handle">
            <div class="handle-item" @click.stop="deleteItem(item)">
              <Delete class="icon" style="width: 14px; height: 14px" />
            </div>
          </div>
        </div>
      </el-scrollbar>
      <div class="add-box">
        <div class="add-box-item" @click="addNewNote">
          <Plus class="icon" style="width: 20px; height: 20px" />
        </div>
      </div>
    </div>
    <div class="detail-right">
      <div class="detail-right-content">
        <div
          class="detail-right-content-top"
          v-if="props.modelValue.length > 0"
        >
          <el-input
            v-model="activeItem.title"
            placeholder="请输入标题"
            :disabled="false"
            style="
              --height: 27px;
              --dividing-line: #f2f2f2;
              --el-border-color: rgba(0, 0, 0, 0);
              --el-border-color-hover: rgba(0, 0, 0, 0);
              --el-input-focus-border-color: rgba(0, 0, 0, 0);
            "
          />
        </div>
        <div
          class="detail-right-content-main"
          v-if="props.modelValue.length > 0"
        >
          <el-input
            ref="textArea"
            type="textarea"
            v-model="activeItem.content"
            placeholder="请输入内容"
            style="
              --height: 27px;
              --dividing-line: #f2f2f2;
              --el-border-color: rgba(0, 0, 0, 0);
              --el-border-color-hover: rgba(0, 0, 0, 0);
              --el-input-focus-border-color: rgba(0, 0, 0, 0);
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import dayjs from "dayjs";
// 定义接口
interface memorandumList {
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  id: string;
}
const props: any = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});
// 获取textarea
const textArea = ref<HTMLElement>();
nextTick(() => {
  console.log("获取textarea", textArea);
});

// 当前选中的项
const activeItem = ref<memorandumList>({} as memorandumList);
// 默认选中第一项
if (props.modelValue.length > 0) {
  activeItem.value = props.modelValue[0];
}
const active = (item: memorandumList) => {
  activeItem.value = item;
};
// 创建新备忘录
const addNewNote = () => {
  const newNote: memorandumList = {
    title: "无标题",
    content: "",
    createTime: dayjs().format("YYYY-MM-DD HH:mm"),
    updateTime: dayjs().format("YYYY-MM-DD HH:mm"),
    // id取完全随机数
    id: Math.random().toString(36).substr(2),
  };
  props.modelValue.push(newNote);
  activeItem.value = newNote;
};
// 删除备忘录
const deleteItem = (item: memorandumList) => {
  const index = props.modelValue.findIndex(
    (i: memorandumList) => i.id === item.id
  );
  props.modelValue.splice(index, 1);
  // 删除后选中项的逻辑:
  // 1.如果删除的是最后一项,则选中上一项
  // 2.如果删除的不是最后一项,则选中下一项
  // 3.如果删除后没有任何项,则选中空对象
  if (props.modelValue.length > 0) {
    if (props.modelValue.length > index) {
      activeItem.value = props.modelValue[index];
    } else {
      activeItem.value = props.modelValue[index - 1];
    }
  } else {
    activeItem.value = {} as memorandumList;
  }
};
</script>

<style lang="scss" scoped>
.detail {
  height: 100%;
  display: flex;
  .detail-left {
    width: 160px;
    background-color: aliceblue;
    height: 100%;
    position: relative;
    padding: 20px 0;
    .detail-left-item {
      height: 68px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      .info {
        .title {
          height: 30px;
          line-height: 30px;
        }
        .time {
          font-size: 12px;
          color: #777;
        }
      }
      .handle {
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        // 缩放
        transform: scale(0);
      }
      &:hover {
        background-color: #fff;
        .handle {
          color: #1890ff;
          transform: scale(1);
        }
      }
      &.active {
        background-color: #fff;
      }
    }
    .add-box {
      position: absolute;
      bottom: 10px;
      right: 10px;
      .add-box-item {
        width: 30px;
        height: 30px;
        border-radius: 40px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: #1890ff;
        transition: all 0.3s;
        &:hover {
          background-color: rgba($color: #1890ff, $alpha: 0.75);
        }
      }
    }
  }
  .detail-right {
    flex: 1;
    .detail-right-content {
      padding: 10px;
      padding-top: 0;
      height: 100%;
      .detail-right-content-top {
        width: calc(100% - 60px);
        height: 40px;
        line-height: 40px;
      }
      .detail-right-content-main {
        height: calc(100% - 40px);
        border-top: 1px solid rgba($color: #000000, $alpha: 0.07);
        :deep(.el-textarea) {
          height: 100%;
          .el-textarea__inner {
            background: linear-gradient(
              180deg,
              transparent,
              transparent var(--height),
              var(--dividing-line) var(--height),
              var(--dividing-line) var(--height)
            );
            background-size: 100% calc(var(--height) + 1px);
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
