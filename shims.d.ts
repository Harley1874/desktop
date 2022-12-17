/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-14 21:06:44
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-14 21:06:50
 */
declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
