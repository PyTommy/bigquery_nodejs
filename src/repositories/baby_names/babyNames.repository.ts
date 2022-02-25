import { Baby, BabyGender, QueryRequestParams } from '../../types';
import { BaseAbstractRepository } from '../base/base.abstract.repository';
export class BabiesRepository extends BaseAbstractRepository<Baby> {
	async findByGender(
		gender: BabyGender,
		options?: QueryRequestParams
	): Promise<{ data: Baby[]; cursor?: string }> {
		const { colmuns = ['*'], maxResults = 100, cursor } = options || {};
		const query = `
      SELECT ${colmuns.join(',')} FROM \`${this.projectId}.${this.datasetId}.${
			this.tableId
		}\`
      WHERE gender = '${gender}'
    `;
		return this.runQuery(query, { maxResults, pageToken: cursor });
	}
}
