# opendata-shinjuku

新宿区の町丁別人口データを収集・整形し、可視化するプロジェクトです。

[**デモ: 新宿区人口町丁別推移**](https://code4fukui.github.io/opendata-shinjuku/)

デモページでは、新宿区の各町丁における世帯数の推移を可視化したインタラクティブな折れ線グラフを表示しています。

## データ

このリポジトリは、新宿区が提供するExcel（XLSX）形式のオープンデータを、機械判読性の高いCSV形式に変換して提供します。

処理済みデータは `csv/` ディレクトリに格納されています:
- [`csv/all.csv`](csv/all.csv): 全人口（日本人および外国人住民）
- [`csv/jp.csv`](csv/jp.csv): 日本人住民のみ
- [`csv/other.csv`](csv/other.csv): 外国人住民のみ

すべてのソースファイルと対応する処理済みデータの一覧は [`population.csv`](population.csv) にまとめられています。

## データ更新の仕組み

データは一連の [Deno](https://deno.land/) スクリプトを使用して処理されます:

1. `scrape.js`: 新宿区のウェブサイトから新しい人口データのXLSXファイルをスクレイピングします。
2. `download.js`: `index.csv` にリストされているXLSXファイルをダウンロードします。
3. `xlsx2csv.js`: 各XLSXファイルを解析し、標準化されたCSV形式に変換します。
4. `make.js`: 個別のCSVファイルを統合し、`all.csv`、`jp.csv`、`other.csv` を作成します。

データを更新するには、以下の順でスクリプトを実行します:
```bash
deno run -A scrape.js
deno run -A download.js
deno run -A xlsx2csv.js
deno run -A make.js
```

## 出典

- [住民基本台帳人口　町丁別男女別人口及び世帯数：新宿区](https://www.city.shinjuku.lg.jp/kusei/file02_00025.html)

このプロジェクトは [Code for FUKUI](https://github.com/code4fukui) によってメンテナンスされています。
