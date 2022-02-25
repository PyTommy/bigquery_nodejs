export type QueryRequestParams<Custom extends Record<string, any> = {}> = {
	colmuns?: string[];
	maxResults?: number;
	cursor?: string;
} & Custom;

export type QueryResponse<T> = {
	data: T[];
	cursor?: string;
};

export type BabyGender = 'M' | 'F';
export interface Baby {
	name: string;
	gender: BabyGender;
	count: number;
}
