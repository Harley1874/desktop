/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-03 00:56:53
 * @LastEditors: 李峥
 * @LastEditTime: 2022-12-03 01:07:00
 */
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("ks7kfF5UH3TVOsrY"); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("TfY6XFo5usSADtaA"); //十六位十六进制数作为密钥偏移量

export function decryptAES(word: string) {
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

export function encryptAES(word: string) {
  let encrypted = CryptoJS.AES.encrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
