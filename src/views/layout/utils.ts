/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-18 21:15:46
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-18 21:18:29
 */
// 计算class名称
export const toClassName = (item: {
  layout: string;
  componentsName: string;
}) => {
  let str = "";
  if (item.layout) {
    str += `icon-size-${item.layout}`;
  }
  if (item.componentsName == "folder") {
    str += ` folder`;
  } else {
    str += ` drag`;
  }
  return str;
};
