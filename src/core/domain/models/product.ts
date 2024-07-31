export interface Product {
	id: string;
	name: string;
	amount: number;
	description?: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
}
