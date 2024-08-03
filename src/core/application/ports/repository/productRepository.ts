import { Product } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';

export interface ProductRepository {
	getProducts(): Promise<Product[]>;
	getProductsByCategory(categoryId: string): Promise<Product[]>;
	deleteProducts(id: string): Promise<void>;
	createProducts(product: CreateProductParams): Promise<Product>;
	updateProducts(product: UpdateProductParams): Promise<Product>;
}
