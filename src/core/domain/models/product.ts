import { ProductCategory } from '@models/productCategory';

export interface Product {
	id: string;
	name: string;
	amount: number;
	description: string | null;
	category: ProductCategory;
	createdAt: Date;
	updatedAt: Date;
}
