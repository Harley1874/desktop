<!--
 * @Descripttion: 
 * @Author: 李峥
 * @Date: 2022-12-16 23:20:10
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 20:12:23
-->
<template>
  <div
    class="web_icon weather"
    @contextmenu.prevent.stop="rightClick"
    :class="layoutClass"
  >
    <template v-if="props.data.layout == '1*1'">
      <div
        class="weather-box photo"
        style="
          padding: 0;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        "
      >
        <div class="site" style="text-align: center">{{ cityName || "-" }}</div>
        <div class="temperature" style="text-align: center; font-size: 16px">
          {{ nowWeather.temp || "-" }}°
        </div>
      </div>
    </template>
    <template v-if="props.data.layout == '1*2'" key="1*2">
      <div
        class="weather-box photo"
        style="
          padding: 8px 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div class="top">
          <div class="left">
            <div class="site">{{ cityName || "-" }}</div>
            <div class="temperature" style="font-size: 16px">
              {{ nowWeather.temp || "-" }}°
            </div>
          </div>
          <div class="right" style="justify-content: center">
            <div class="weather_span">
              <div class="weather_span_text">
                {{ nowWeather.text || "-" }}
              </div>
              <Sunny
                class="weather_span_icon"
                style="width: 24px; height: 24px"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="props.data.layout == '2*2'" key="2*2">
      <div
        class="weather-box photo"
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div class="top">
          <div class="left">
            <div class="site">{{ cityName || "-" }}</div>
            <div class="temperature">{{ nowWeather.temp || "-" }}°</div>
          </div>
          <div class="right">
            <div class="weather_span" style="flex-direction: column">
              <Sunny
                class="weather_span_icon"
                style="width: 24px; height: 24px"
              />
              <div>{{ nowWeather.text }}</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>AQI 良/63</div>
          <div>最高1° 最低-3°</div>
        </div>
      </div>
    </template>
    <template v-if="props.data.layout == '2*1'" key="2*1">
      <div
        class="weather-box photo"
        style="
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        "
      >
        <div
          class="top"
          style="
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
          "
        >
          <div class="site">{{ cityName || "-" }}</div>
          <div class="temperature" style="font-size: 16px">
            {{ nowWeather.temp || "-" }}°
          </div>
        </div>
        <div
          class="bottom"
          style="display: flex; flex-direction: column; text-align: center"
        >
          <Sunny
            class="weather_span_icon"
            style="
              width: 24px;
              height: 24px;
              margin: 0 auto;
              margin-bottom: 4px;
            "
          />
          <div class="weather_span_text">
            {{ nowWeather.text || "-" }}
          </div>
        </div>
      </div>
    </template>
    <template v-if="props.data.layout == '2*4'" key="2*4">
      <div class="weather-box photo">
        <div class="top">
          <div class="left">
            <div class="site">{{ cityName || "-" }}</div>
            <div class="temperature">{{ nowWeather.temp || "-" }}°</div>
          </div>
          <div class="right">
            <div class="weather_span">
              <div class="weather_span_text">
                {{ nowWeather.text || "-" }}
              </div>
              <Sunny
                class="weather_span_icon"
                style="width: 24px; height: 24px"
              />
            </div>
            <span class="min_max"
              >最高{{ nowWeather.tempMin }}° 最低{{ nowWeather.tempMax }}°</span
            >
          </div>
        </div>
        <div class="bottom">
          <div class="day-list">
            <div class="item" v-for="item in weatherList">
              <span class="text">{{ weekCalc(item.fxDate) }}</span>
              <el-icon :size="20"> <Sunny /></el-icon>
              <span class="min_max">{{
                `${item.tempMin || "0"}/${item.tempMax || "0"}`
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <p class="app-item-title">天气</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { rightClickMenu } from "@/components/modules/rightClickMenu/index.js";
import { useWeatherStore } from "@/store/modules/weather.js";
import dayjs from "dayjs";
const weatherStore = useWeatherStore();
// 父页面像本页面传值
const props = defineProps(["data"]);
let data = ref({});
data = props.data;
// 获取用户所在城市
let cityName = ref(weatherStore.cityName);
// 当天天气
let nowWeather: any = ref(weatherStore.nowWeather);
// 未来6天天气
let weatherList: any = ref(weatherStore.weatherList);
const weekCalc = (val: string) => {
  const tomorrowDay = dayjs().add(1, "day").format("YYYY-MM-DD");
  const weekList = ["日", "一", "二", "三", "四", "五", "六"];
  const week: any = dayjs(val).format("d");
  if (val == tomorrowDay) {
    return "明天";
  } else {
    return `周${weekList[week]}`;
  }
};
const today = dayjs().format("YYYY-MM-DD");
const piniaToday = weatherStore.nowWeather.fxDate;
if (today !== piniaToday) {
  weatherStore.GET_WEATHER();
}
const rightClick = (event: any) => {
  const destroy = rightClickMenu.open(data, event, []);
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
$--icon-size: 50px;
$--icon-gay: 30px;
$--icon-radius: 10px;
* {
  box-sizing: border-box;
}
.weather {
  cursor: pointer;
  &:hover {
    .weather-box {
      box-shadow: 0 0 10px #0000004d;
    }
  }
  .weather-box {
    background-color: #154280;
    background-image: linear-gradient(45deg, #000012 20%, #29334e);
    color: #fff;
    font-size: 12px;
    border-radius: 16px;
    transition: all 0.3s;
    padding: 10px 14px;
  }
  .app-item-title {
    font-size: 12px;
    text-align: center;
  }
}
.weather-box {
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      .temperature {
        font-size: 24px;
      }
    }
    .right {
      text-align: right;
      display: flex;
      flex-direction: column;
      .weather_span {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .weather_span_text {
          margin-right: 4px;
        }
      }
      .min-max {
        margin-top: 4px;
      }
    }
  }
}
.day-list {
  display: flex;
  padding-top: 8px;
  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    font-size: 12px;
  }
}
</style>
