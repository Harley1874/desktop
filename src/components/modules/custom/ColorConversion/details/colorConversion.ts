const colorObj = {
  hex: "",
  rgb: "",
  rgba: "",
  hsl: "",
  hsv: "",
  keyword: "",
  arga: "",
};
export const colorConversion = (color: string) => {
  // 判断是否为16进制颜色
  const isHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(color);
  // 判断是否为rgb颜色
  const isRgb = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(color);
  // 判断是否为rgba颜色
  const isRgba = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d(\.\d+)?)\)$/.test(
    color
  );
  // 判断是否为argba颜色
  const isArgb = /^argb\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d(\.\d+)?)\)$/.test(
    color
  );
  if (isHex) {
    // 16进制颜色
    const hex = color;
    const rgb = hexToRgb(color);
    const rgba = hexToRgba(color);
    const hsl = rgbToHsl(rgb);
    const hsv = rgbToHsv(rgb);
    const keyword = rgbToKeyword(rgb);
    const argb = rgbToArgb(rgb);
    let obj = {
      hex,
      rgb,
      rgba,
      hsl,
      hsv,
      keyword,
      argb,
    };
    return obj;
  } else {
    return colorObj;
  }
};
/*
 * @param: hex: 16进制颜色
 * @return: rgb: rgb颜色
 * @description: 16进制颜色转rgb
 * hexToRgb(#fff) // => rgb(255,255,255)
 * hexToRgb(#ffffff) // => rgb(255,255,255)
 */
const hexToRgb = (hex: string) => {
  let newStr = hex.toLowerCase().replace(/\#/g, "");
  let len = newStr.length;
  if (len == 3) {
    let t = "";
    for (var i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  let arr = []; //将字符串分隔，两个两个的分隔
  for (var i = 0; i < 6; i = i + 2) {
    let s = newStr.slice(i, i + 2);
    arr.push(parseInt("0x" + s));
  }
  let str: string = "rgb(" + arr.join(",") + ")";
  return str;
};
/*
 * @param: hex: 16进制颜色
 * @return: rgba: rgba颜色
 * @description: 16进制颜色转rgba
 * hexToRgba(#fff) // => rgb(255,255,255,1)
 * hexToRgba(#ffffff) // => rgb(255,255,255,1)
 */
const hexToRgba = (hex: string) => {
  let color = hex.substring(1).split("");
  if (color.length === 3) {
    color = color.map((item) => item + item);
  }
  const rgba = color.map((item) => parseInt(item, 16));
  return `rgba(${rgba.join(",")},1)`;
};
/*
 * @param: rgba: rgba颜色
 * @return: hsl: hsl颜色
 * @description: rgb颜色转hsl
 * rgbToHsl(rgb(255,255,255)) // =>hsl(0°, 0.00% , 100.00% )
 */
const rgbToHsl = (rgb: string) => {
  interface colorArrType {
    [key: string]: number;
  }
  const reg = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
  if (!reg.test(rgb)) {
    throw new Error("请输入正确的rgb颜色");
  }
  const colorArr: string[] = rgb.substring(4, rgb.length - 1).split(",");

  const r = Number(colorArr[0]) / 255;
  const g = Number(colorArr[1]) / 255;
  const b = Number(colorArr[2]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsl(${h},${s},${l})`;
};

/*
 * @param: rgb: rgb颜色
 * @return: hsv: hsv颜色
 * @description: rgb颜色转hsv
 * rgbToHsv(rgb(255,255,255)) // =>hsv(0, 0, 1.00)
 */
const rgbToHsv = (rgb: string) => {
  const reg = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
  if (!reg.test(rgb)) {
    throw new Error("请输入正确的rgb颜色");
  }
  const colorArr: string[] = rgb.substring(4, rgb.length - 1).split(",");
  const r = Number(colorArr[0]) / 255;
  const g = Number(colorArr[1]) / 255;
  const b = Number(colorArr[2]) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `hsv(${h},${s},${v})`;
};

/*
 * @param: rgb: rgb颜色
 * @return: keyword: Keyword颜色
 * @description: rgb颜色转Keyword
 * rgbToKeyword(rgb(255,255,255)) // => white
 */
const rgbToKeyword = (rgb: string) => {
  interface colorArrType {
    [key: string]: string;
  }
  const reg = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
  if (!reg.test(rgb)) {
    throw new Error("请输入正确的rgb颜色");
  }
  const colorArr: string[] = rgb.substring(4, rgb.length - 1).split(",");
  const r = Number(colorArr[0]);
  const g = Number(colorArr[1]);
  const b = Number(colorArr[2]);
  const keywords: colorArrType = {
    aliceblue: "240,248,255",
    antiquewhite: "250,235,215",
    aqua: "0,255,255",
    aquamarine: "127,255,212",
    azure: "240,255,255",
    beige: "245,245,220",
    bisque: "255,228,196",
    black: "0,0,0",
    blanchedalmond: "255,235,205",
    blue: "0,0,255",
    blueviolet: "138,43,226",
    brown: "165,42,42",
    burlywood: "222,184,135",
    cadetblue: "95,158,160",
    chartreuse: "127,255,0",
    chocolate: "210,105,30",
    coral: "255,127,80",
    cornflowerblue: "100,149,237",
    cornsilk: "255,248,220",
    crimson: "220,20,60",
    cyan: "0,255,255",
    darkblue: "0,0,139",
    darkcyan: "0,139,139",
    darkgoldenrod: "184,134,11",
    darkgray: "169,169,169",
    darkgreen: "0,100,0",
    darkgrey: "169,169,169",
    darkkhaki: "189,183,107",
    darkmagenta: "139,0,139",
    darkolivegreen: "85,107,47",
    darkorange: "255,140,0",
    darkorchid: "153,50,204",
    darkred: "139,0,0",
    darksalmon: "233,150,122",
    darkseagreen: "143,188,143",
    darkslateblue: "72,61,139",
    darkslategray: "47,79,79",
    darkslategrey: "47,79,79",
    darkturquoise: "0,206,209",
    darkviolet: "148,0,211",
    deeppink: "255,20,147",
    deepskyblue: "0,191,255",
    dimgray: "105,105,105",
    dimgrey: "105,105,105",
    dodgerblue: "30,144,255",
    firebrick: "178,34,34",
    floralwhite: "255,250,240",
    forestgreen: "34,139,34",
    fuchsia: "255,0,255",
    gainsboro: "220,220,220",
    ghostwhite: "248,248,255",
    gold: "255,215,0",
    goldenrod: "218,165,32",
    gray: "128,128,128",
    green: "0,128,0",
    greenyellow: "173,255,47",
    grey: "128,128,128",
    honeydew: "240,255,240",
    hotpink: "255,105,180",
    indianred: "205,92,92",
    indigo: "75,0,130",
    ivory: "255,255,240",
    khaki: "240,230,140",
    lavender: "230,230,250",
    lavenderblush: "255,240,245",
    lawngreen: "124,252,0",
    lemonchiffon: "255,250,205",
    lightblue: "173,216,230",
    lightcoral: "240,128,128",
    lightcyan: "224,255,255",
    lightgoldenrodyellow: "250,250,210",
    lightgray: "211,211,211",
    lightgreen: "144,238,144",
    lightgrey: "211,211,211",
    lightpink: "255,182,193",
    lightsalmon: "255,160,122",
    lightseagreen: "32,178,170",
    lightskyblue: "135,206,250",
    lightslategray: "119,136,153",
    lightslategrey: "119,136,153",
    lightsteelblue: "176,196,222",
    lightyellow: "255,255,224",
    lime: "0,255,0",
    limegreen: "50,205,50",
    linen: "250,240,230",
    magenta: "255,0,255",
    maroon: "128,0,0",
    mediumaquamarine: "102,205,170",
    mediumblue: "0,0,205",
    white: "255,255,255",
  };
  const keyword = Object.keys(keywords).find(
    (key: keyof colorArrType) => keywords[key] === `${r},${g},${b}`
  );
  return keyword || rgb;
};

/*
 * @param: rgb: rgb颜色
 * @return: Arga: Argb颜色
 * @description: rgb颜色转Argb(安卓专用)
 * rgbToKeyword(rgb(255,255,255)) // => #FFFFFFFF
 */
const rgbToArgb = (rgb: string) => {
  const reg = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
  if (!reg.test(rgb)) {
    throw new Error("请输入正确的rgb颜色");
  }
  const colorArr: string[] = rgb.substring(4, rgb.length - 1).split(",");
  const r = Number(colorArr[0]);
  const g = Number(colorArr[1]);
  const b = Number(colorArr[2]);
  const a = 255;
  return `#${a.toString(16)}${r.toString(16)}${g.toString(16)}${b.toString(
    16
  )}`;
};
