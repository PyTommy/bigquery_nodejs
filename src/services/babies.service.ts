import { repositories } from '../repositories/repositories';
import { QueryRequestParams, QueryResponse, Baby, BabyGender } from '../types';

export class BabiesService {
	static async listData(
		options?: QueryRequestParams
	): Promise<QueryResponse<Baby>> {
		return repositories.babies.findAll(options);
	}
	static async listDataByGender(
		gender: BabyGender,
		options?: QueryRequestParams
	): Promise<QueryResponse<Baby>> {
		return repositories.babies.findByGender(gender, options);
	}
}
