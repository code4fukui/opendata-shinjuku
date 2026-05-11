# opendata-shinjuku

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

新宿区の町丁別人口データを収集・整形し、可視化するプロジェクトです。
This project scrapes, processes, and visualizes population data for Shinjuku City, Tokyo.

[**Demo: 新宿区人口町丁別推移 (Population Trends in Shinjuku City by Town)**](https://code4fukui.github.io/opendata-shinjuku/)

The demo page displays an interactive line chart visualizing the change in the number of households for each town in Shinjuku over time.

## データ (Data)

このリポジトリは、新宿区が提供するExcel（XLSX）形式のオープンデータを、機械判読性の高いCSV形式に変換して提供します。

The processed data is available in the `csv/` directory:
- [`csv/all.csv`](csv/all.csv): Total population (Japanese and foreign residents).
- [`csv/jp.csv`](csv/jp.csv): Japanese residents only.
- [`csv/other.csv`](csv/other.csv): Foreign residents only.

A master index of all source files and their corresponding processed data is available at [`population.csv`](population.csv).

## データ更新の仕組み (How It Works)

The data is processed using a series of [Deno](https://deno.land/) scripts:

1.  `scrape.js`: Scrapes the Shinjuku City website for new population data XLSX files.
2.  `download.js`: Downloads the XLSX files listed in `index.csv`.
3.  `xlsx2csv.js`: Parses each XLSX file and converts it into a standardized CSV format.
4.  `make.js`: Aggregates the individual CSVs into the combined `all.csv`, `jp.csv`, and `other.csv` files.

To update the data, run the scripts in order:
```bash
deno run -A scrape.js
deno run -A download.js
deno run -A xlsx2csv.js
deno run -A make.js
```

## 出典 (Data Source)

- [住民基本台帳人口　町丁別男女別人口及び世帯数：新宿区](https://www.city.shinjuku.lg.jp/kusei/file02_00025.html)

This project is maintained by [Code for FUKUI](https://github.com/code4fukui).