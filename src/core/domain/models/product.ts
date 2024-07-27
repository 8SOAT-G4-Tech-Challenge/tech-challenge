import { ProductCategory } from '@models/productCategory';
import { Decimal } from '@prisma/client/runtime/library';

export interface Product {
	id: string;
	name: string;
	amount: Decimal;
	description: string | null;
	categoryId: string;
	category: ProductCategory;
	createdAt: Date;
	updatedAt: Date;
}
