# Bigquery_Express

## 概要
BigQueryからデータを取得してクライアントに返すexpressjsのアプリケーション。

「起動までにすべきこと」を終えたら、以下のようなbaby_namesを取得できるようになる。
![Screen Shot 2022-02-26 at 0 04 02](https://user-images.githubusercontent.com/52193990/155738297-7b60b077-3d38-42f6-b8a2-11c268573a75.png)


## 起動までにすべきこと

1. [GCP のチュートリアル](https://cloud.google.com/bigquery/docs/quickstarts/load-data-console?hl=ja)に沿って BigQuery にデータを作成する
   データは以下のように作って！

```
datasetId: "babynames",
tableId: "names_2014",
datasets: ./dataset/insert_baby.sql
```

2. [GCP の公式ドキュメント](https://cloud.google.com/bigquery/docs/authentication/service-account-file)とか参考にして BigQuery のサービスアカウントを作って`./src/secrets/bigquery_service_account.json`に保存して！(一旦、BigQuery 編集者と BigQuery ジョブユーザーあたり付与しちゃおう)

3. ローカル環境を立ち上げて！

```
npm i
npm run start
```

4. `./rest_client.http`からエンドポイント叩いてみて！([RestClient](https://qiita.com/toshi0607/items/c4440d3fbfa72eac840c))

## 補足

- 環境変数を新しく作りたいなら、`./.env`を作って！([参照](https://www.npmjs.com/package/dotenv))
