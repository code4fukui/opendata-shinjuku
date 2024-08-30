import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

const fn = "index.csv";
const list = await CSV.fetchJSON(fn, []);
for (const item of list) {
  const url = item.url;
  const fn = url.substring(url.lastIndexOf("/") + 1);
  console.log(fn);
  const destfn = "xlsx/" + fn;
  try {
    await Deno.readFile(destfn);
    continue;
  } catch (e) {
  }
  const bin = new Uint8Array(await (await fetch(url)).arrayBuffer());
  await Deno.writeFile(destfn, bin);
  await sleep(500);
}
