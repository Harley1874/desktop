<template>
  <div class="itxst">
    <div>
      <GJdraggable :data="state.list"></GJdraggable>
    </div>
    <!-- <div>{{ state.list }}</div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import GJdraggable from "@/components/modules/GJdraggable/index.vue";
/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
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

//拖拽开始的事件
const onStart = () => {
  console.log("开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  console.log("结束拖拽");
};
</script>
<style scoped>
.itxst {
  width: 400px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
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
</style>
