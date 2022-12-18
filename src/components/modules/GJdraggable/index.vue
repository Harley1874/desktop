<template>
  <div class="dragList">
    <div class="dragList-list1">
      <h3 style="text-align: center">标签选择</h3>
      <Draggable
        :list="list2"
        item-key="id"
        :animation="100"
        group="article"
        @end="end1"
        class="dragArea1"
      >
        <template #item="{ element }">
          <div class="list-complete-item1">
            <div class="list-complete-item-handle2">{{ element.name }}</div>
          </div>
        </template>
      </Draggable>
    </div>

    <div class="dragList-list2">
      <h3 style="text-align: center">拖动至此处</h3>
      <Draggable
        :list="list1"
        item-key="id"
        group="article"
        @start="start2"
        @end="end2"
        class="dragArea2"
      >
        <template #item="{ element, index }">
          <div class="list-complete-item2">
            <div class="list-complete-item-handle">{{ element.name }}</div>
            <div>
              <i
                class="el-icon-delete"
                @click="handleDel(index, element.id)"
              ></i>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  setup() {
    const disabled = ref(false);
    const list1 = reactive([]);
    const list2 = reactive([
      { id: 1, name: "标签1" },
      { id: 2, name: "标签2" },
      { id: 3, name: "标签3" },
      { id: 4, name: "标签4" },
      { id: 5, name: "标签5" },
    ]);
    const end1 = (ev) => {
      console.log("拖动结束1", ev);
    };
    const start2 = (event) => {
      console.log("开始拖动", event);
    };
    const end2 = (ev) => {
      console.log("拖动结束2", ev);
    };
    const handleDel = (index, id) => {
      list1.splice(index, 1);
      let q = list2.find((value, index, arr) => {
        return value.id === id;
      });
    };
    return {
      disabled,
      list1,
      list2,
      end1,
      start2,
      end2,
      handleDel,
    };
  },
};
</script>

<style lang="scss" scoped>
.dragList {
  padding: 20px;
}
.dragList-list1 {
  width: 120px;
}
.list-complete-item1 {
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  display: inline-block;
  margin-bottom: 10px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}
.dragArea1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dragList-list2 {
  margin-top: 20px;
  height: 200px;
  border: 1px solid #8a8a8a;
}
.dragArea2 {
  display: flex;
  align-items: center;
}
.list-complete-item2 {
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  display: inline-block;
  margin: 10px;
  width: 100px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}
</style>
