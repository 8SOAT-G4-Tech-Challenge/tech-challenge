import { Product } from '@models/product';
import { ProductCategory } from '@models/productCategory';

export interface ProductRepository {
	getProducts(): Promise<Product[]>;
	createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory>;
	getProductCategories(): Promise<ProductCategory[]>;
}
