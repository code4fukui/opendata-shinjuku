import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { Num } from "https://js.sabae.cc/Num.js";

const xlsx2csv = async (fn) => {
  const bin = await Deno.readFile(fn);
  const ws = XLSX.decode(bin);
  const firstname = Object.keys(ws.Sheets)[0];
  const data = XLSX.toCSV(ws.Sheets[firstname]);
  //console.log(data);
  const title = data[0][0];
  const date = data[0][14];
  //console.log(title, date);
  const names = ["町丁名", "世帯数", "男", "女"];
  const list = [names];
  for (let i = 0; i < 3; i++) {
    for (let j = 2;; j++) {
      const v = [];
      if (data.length <= j) break;
      for (let k = 0; k < names.length; k++) {
        const val = Num.removeComma(data[j][i * 5 + k]);
        v.push(val);
      }
      if (v[0].trim() == "" || v[0][0] == "*") break;
      list.push(v);
    }
  }
  return { title, date, csv: list };
};

const fn = "index.csv";
const fn2 = "population.csv";
const list = await CSV.fetchJSON(fn, []);
const list2 = await CSV.fetchJSON(fn2, []);
//const list2 = [];

for (const item of list) {
  const url = item.url;
  if (list2.find(i => i.url == url)) continue;

  //const url = "https://www.city.shinjuku.lg.jp/content/000251385.xlsx";
  const fn = "xlsx/" + url.substring(url.lastIndexOf("/") + 1);
  const res = await xlsx2csv(fn);
  //console.log(res);

  const date = new Day(res.date).toString();

  const getType = (s) => {
    if (s.indexOf("日本人のみ") >= 0) return "_jp";
    if (s.indexOf("外国人のみ") >= 0) return "_other";
    if (s.indexOf("日本人と外国人の合計") >= 0) return "_all";
    throw new Error("illegal title");
  };
  const type = getType(res.title);
  const csv = "csv/" + date + type + ".csv";
  list2.push({ url, title: res.title + " " + res.date, date, csv });
  
  await Deno.writeTextFile(csv, CSV.encode(res.csv));
}
console.log(list2);

await Deno.writeTextFile(fn2, CSV.stringify(list2));
