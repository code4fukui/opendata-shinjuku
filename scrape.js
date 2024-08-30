import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { sleep } from "https://js.sabae.cc/sleep.js";


const url = "https://www.city.shinjuku.lg.jp/kusei/file02_00025.html";
const baseurl = "https://www.city.shinjuku.lg.jp";

const html = await fetchOrLoad(url);
const dom = HTMLParser.parse(html);

const as = dom.querySelectorAll(".MsoNormalTable a");
const links = as.map(i => i.getAttribute("href")).filter(i => i.endsWith(".xlsx")).map(i => baseurl + i);
console.log(links);

const fn = "index.csv";
const list = await CSV.fetchJSON(fn, []);
links.reverse();
for (const link of links) {
  const url = link;
  if (list.find(i => i.url == url)) continue;
  list.push({ url });
}

await Deno.writeTextFile(fn, CSV.stringify(list));
