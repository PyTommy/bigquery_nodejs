import path from 'path';
import { BigQuery } from '@google-cloud/bigquery';
import { BabiesRepository } from './baby_names/babyNames.repository';

const projectId = 'tomitomi-dev';
const bigquery = new BigQuery({
	projectId,
	keyFilename: path.join(__dirname, '../secrets/bigquery_service_account.json'),
});

// 一旦テキトーに初期化しちゃう。
export const repositories = {
	babies: new BabiesRepository(bigquery, {
		projectId,
		datasetId: 'babynames',
		tableId: 'names_2014',
	}),
} as const;
