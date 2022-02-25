export interface BaseInterfaceReadRepository<T> {
	// findOneById(id: number): Promise<T>;
	findAll(): Promise<{ data: T[]; cursor?: string }>;
}

// export interface BaseInterfaceWriteRepository<T> {
// 	create(data: T): Promise<{ id: string }>;
// 	update(data: Partial<T>): Promise<{ id: string }>;
// 	delete(id: string): Promise<{ id: string }>;
// }
