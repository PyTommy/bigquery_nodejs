# Bigquery_Express

## 概要

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
