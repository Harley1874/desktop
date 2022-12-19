/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-18 20:17:55
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-19 20:35:32
 */
/* 大写转小写
 * @param {String} str
 * @return {String} str
 * @example
 * toLowerCase('ABC') => 'abc'
 * toLowerCase('aBc') => 'abc'
 * toLowerCase('abc') => 'abc'
 */
export function toLowerCase(str: string) {
  // 大写A转小写a
  return str.toLowerCase();
}

/* key是否在对象类型中
 * @Descripttion:
 * @param {string | number | symbol} key
 * @param {object} object
 * @return {*}
 * @example
 * isValidKey('a', {a: 1}) => true
 * isValidKey('b', {a: 1}) => false
 * isValidKey(1, {a: 1}) => false
 */
export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

/* 深拷贝
 * @Descripttion:
 * @param {object} target
 * @return {*}
 * @example
 * deepClone({a: 1}) => {a: 1}
 * deepClone({a: {b: 1}}) => {a: {b: 1}}
 */
export function deepClone(target: any) {
  if (typeof target === "object" && target !== null) {
    const cloneTarget: any = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
