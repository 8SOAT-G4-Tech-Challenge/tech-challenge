export type UpdateProductParams = {
	id: string;
	name?: string;
	amount?: number;
	description?: string;
	categoryId?: string;
};

export type CreateProductParams = {
	name: string;
	amount: number;
	description: string;
	categoryId: string;
};
