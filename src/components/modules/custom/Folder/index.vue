<template>
  <div class="web_icon folder">
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
            :class="toClassName(element)"
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
import { toClassName } from "@/views/layout/utils.js";
// 父页面像本页面传值
const props = defineProps(["data"]);
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
</script>

<style lang="scss" scoped>
$--icon-size: 40px;
$--icon-gay: 20px;
$--icon-radius: 10px;

.folder-box {
  width: 80px;
  height: 80px;
  background: rgba($color: #fff, $alpha: 0.25);
  border: 1px solid rgba($color: #fff, $alpha: 0.25);
}
.dragArea2 {
  display: flex;
  flex-wrap: wrap;
  :deep(.web_icon.icon-size-1X1){
    width: 60px;
    height: 60px;
  }
}
</style>
