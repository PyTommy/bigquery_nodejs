import type { BigQuery } from '@google-cloud/bigquery';
import { QueryRequestParams } from '../../types';
import { BaseInterfaceReadRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T>
	implements BaseInterfaceReadRepository<T>
{
	protected readonly bigquery: BigQuery;
	protected readonly projectId: string;
	protected readonly datasetId: string;
	protected readonly tableId: string;

	constructor(
		bigquery: BigQuery,
		{
			projectId,
			datasetId,
			tableId,
		}: { projectId: string; datasetId: string; tableId: string }
	) {
		this.bigquery = bigquery;
		this.projectId = projectId;
		this.datasetId = datasetId;
		this.tableId = tableId;
	}

	protected async runQuery<T>(
		query: string,
		options: { maxResults: number; pageToken?: string }
	): Promise<{ data: T[]; cursor?: string }> {
		const { maxResults, pageToken } = options;
		const [job] = await this.bigquery.createQueryJob(query);

		const [rows, , resultResponse] = await job.getQueryResults({
			maxResults,
			pageToken,
		});

		console.log(resultResponse?.pageToken);
		return { data: rows as T[], cursor: resultResponse?.pageToken };
	}

	async findAll(
		options?: QueryRequestParams
	): Promise<{ data: T[]; cursor?: string }> {
		const { colmuns = ['*'], maxResults = 100, cursor } = options || {};
		const query = `
      SELECT ${colmuns.join(',')} FROM \`${this.projectId}.${this.datasetId}.${
			this.tableId
		}\`
    `;
		return this.runQuery(query, { maxResults, pageToken: cursor });
	}
}
