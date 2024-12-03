import { Product } from '@src/core/domain/models/product';
import { ProductCategory } from '@src/core/domain/models/productCategory';

import {
	DeleteProductCategoryParams,
	UpdateProductCategoryParams,
} from '../input/productCategory';

export interface ProductCategoryRepository {
	createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory>;
	getProductCategories(): Promise<ProductCategory[]>;
	getProductCategoryByName(name: string): Promise<ProductCategory | null>;
	getProductCategoryById(id: string): Promise<ProductCategory | null>;
	getFirstProductByCategory(id: string): Promise<Product | null>;
	deleteProductCategories(
		deleteProductCategoryParams: DeleteProductCategoryParams
	): Promise<void>;
	updateProductCategory(
		id: string,
		productCategory: UpdateProductCategoryParams
	): Promise<ProductCategory>;
}
