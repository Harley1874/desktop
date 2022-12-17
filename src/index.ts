/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-03 17:56:32
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-03 17:56:43
 */
import { createPinia } from "pinia";
// 引入持久化插件
import piniaPluginPersist from "pinia-plugin-persist";
const store = createPinia();
store.use(piniaPluginPersist);
export default store;
