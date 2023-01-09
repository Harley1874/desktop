/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2022-12-25 19:36:36
 * @LastEditors: 李峥
 * @LastEditTime: 2023-01-09 21:39:14
 */
import Dexie from "dexie";
export class AppDatabase extends Dexie {
  myWallpaper: Dexie.Table<Contact, number>;
  constructor() {
    super("myWallpaperDatabase");
    var db = this;
    db.version(1).stores({
      myWallpaper: "++id, key, base64",
    });
    db.myWallpaper.mapToClass(Contact);
  }
}

export class Contact {
  key: number | string;
  base64: string;
  constructor(first: string, last: string, id?: number) {
    this.key = first;
    this.base64 = last;
    if (id) this.key = id;
  }
  // save() {
  //   return db.transaction("rw", db.myWallpaper, async () => {
  //     this.key = await db.myWallpaper.put(this);
  //   });
  // }
}

export var db = new AppDatabase();

export const getList = () => {
  db.myWallpaper.toArray().then((res) => {
    const arr: any = res.sort((a: any, b: any) => {
      return a.id - b.id;
    });
    console.log("🚀 ~ file: db.ts:45 ~ db.myWallpaper.toArray ~ arr", arr);
    return arr;
  });
};
