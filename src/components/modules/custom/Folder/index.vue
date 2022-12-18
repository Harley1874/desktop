<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-16 23:20:10
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 18:57:46
-->
<template>
  <div class="web_icon folder" :class="layoutClass">
    <div class="folder-box photo">
      <draggable
        item-key="id"
        :list="list1"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        :group="{ name: 'article', put: true }"
        class="dragArea2"
      >
        <template #item="{ element }">
          <component
            :is="comParse(element.componentsName)"
            :data="element"
          ></component>
        </template>
      </draggable>
    </div>
    <p class="app-item-title">{{ props.data.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { markRaw, onMounted, ref, watch } from "vue";
import draggable from "vuedraggable";
// 小组件
import weather from "@/components/modules/custom/Weather/index.vue"; // 天气组件
import smallWeb from "@/components/modules/small_web/index.vue"; // 小网页组件
// 父页面像本页面传值
const props = defineProps(["data"]);
let data = ref({});
data = props.data;
const list1 = ref([]);

// 组件渲染
const comParse = (str: String) => {
  // 动态组件渲染
  switch (str) {
    case "weather":
      return markRaw(weather);
    default:
      return markRaw(smallWeb);
  }
};
// 首次进入打开
watch(props, (nweProps, oldProps) => {
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
onMounted(() => {
  computedClass();
});
</script>

<style lang="scss" scoped>
$--icon-size: 40px;
$--icon-gay: 20px;
$--icon-radius: 10px;

.folder-box {
  width: 80px;
  height: 80px;
  border: 1px solid red;
}
.dragArea2 {
  display: flex;
  flex-wrap: wrap;
  ::v-deep {
    .web_icon.icon-size-1-1 {
      //
      width: 60px;
      height: 60px;
    }
  }
}
</style>
