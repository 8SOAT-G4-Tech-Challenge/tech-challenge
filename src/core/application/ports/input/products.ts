export type UpdateProductParams = {
	id: string;
	name?: string;
	value?: number;
	description?: string;
	categoryId?: string;
};

export type CreateProductParams = {
	name: string;
	value: number;
	description: string;
	categoryId: string;
};
