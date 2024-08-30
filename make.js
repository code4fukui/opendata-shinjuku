import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";

const fn2 = "population.csv";
const list = await CSV.fetchJSON(fn2);

const types = {};
for (const item of list) {
  // url,title,date,csv
  const csv = item.csv;
  const data = await CSV.fetchJSON(csv);
  const type = csv.substring(csv.lastIndexOf("_") + 1, csv.length - 4);
  let data2 = types[type];
  if (!data2) {
    data2 = types[type] = [];
  }
  for (const d of data) {
    d.date = item.date;
    data2.push(d);
  }
}

for (const name in types) {
  const fn = "csv/" + name + ".csv";
  const list = types[name];
  await Deno.writeTextFile(fn, CSV.stringify(list));
}
