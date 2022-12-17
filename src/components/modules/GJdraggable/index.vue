<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-17 22:29:01
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-17 23:43:55
-->
<!--  -->
<template>
  <div class="itxst">
    <draggable
      item-key="id"
      :list="props.data"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      :group="{ name: 'article' }"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="item" v-if="element.type == 'normal'">
          {{ element.name }}
        </div>
      </template>
    </draggable>

    <div class="dragList-list2">
      <h3 style="text-align: center">拖动至此处</h3>
      <draggable
        tag="ul"
        item-key="id"
        :list="list1"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        :group="{ name: 'article', pull: '' }"
        @start="start2"
        @end="end2"
        class="dragArea2"
      >
        <template #item="{ element }">
          <li class="item" v-if="element.type == 'normal'">
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import draggable from "vuedraggable";
/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
console.log("🚀 ~ file: index.vue:53 ~ props", props);

const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: "张三", id: 0, type: "normal" },
    { name: "李四", id: 1, type: "normal" },
    { name: "王五", id: 2, type: "normal" },
    {
      name: "文件夹",
      id: 3,
      type: "folder",
      tasks: [
        {
          name: "文件app1",
          id: 4,
          type: "normal",
        },
        {
          name: "文件app2",
          id: 5,
          type: "normal",
        },
        {
          name: "文件app3",
          id: 6,
          type: "normal",
        },
      ],
    },
  ],
});

const list1 = reactive([]);

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
const start2 = () => {
  console.log("开始拖拽");
};
const end2 = () => {
  console.log("结束拖拽");
};
</script>
<style scoped lang="scss">
.itxst {
  width: 800px;
  display: flex;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(19, 41, 239);
}
.chosenClass {
  background-color: #f1f1f1;
}
.dragList-list2 {
  width: 300px;
  height: 300px;
  margin-left: 20px;
  .dragArea2 {
    width: 300px;
    height: 300px;
    border: 1px dashed #ccc;
    display: block;
  }
}
</style>
