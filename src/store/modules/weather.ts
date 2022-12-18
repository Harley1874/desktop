/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-17 13:12:23
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 00:27:45
 */
import { defineStore } from "pinia";
import dayjs from "dayjs";
import { getCity, getWeather, getWeather2 } from "@/api/weather";
export const useWeatherStore = defineStore("weather", {
  state: () => {
    return {
      nowWeather: {
        fxDate: dayjs().format("YYYY-MM-DD"), //日期
        temp: "0", //温度
        text: "阴", //天气状况
        tempMin: "0", //最低温度
        tempMax: "0", //最高温度
      },
      weatherList: [],
      cityName: "", // 所在城市
      rectangle: "", //所在城市的经纬度
      cityXY: "", // 所在城市的经纬度,和风天气需要
    };
  },
  actions: {
    async GET_WEATHER() {
      const { city, rectangle, adcode }: any = await getCity();
      // 过滤市字
      this.cityName = city.replace("市", "");
      this.rectangle = rectangle;
      this.cityXY = rectangle.split(";")[0];
      let HF_query = {
        location: this.cityXY,
      };
      let p1 = getWeather(HF_query);
      let p2 = getWeather2(HF_query);
      Promise.all([p1, p2]).then((res) => {
        const { now }: any = res[0];
        const { daily }: any = res[1];
        this.nowWeather.temp = now.temp;
        this.nowWeather.text = now.text;
        this.nowWeather.tempMin = daily[0].tempMin;
        this.nowWeather.tempMax = daily[0].tempMax;
        this.weatherList = daily.filter((item: any) => {
          return item.fxDate != dayjs().format("YYYY-MM-DD");
        });
        this.nowWeather.fxDate = dayjs().format("YYYY-MM-DD");
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: "weather",
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
