import { UpdateProductResponse } from '@application/ports/output/products';
import { UpdateProductParams } from '@ports/input/products';
import { ProductDto } from '@src/adapter/driver/schemas/productSchema';

export interface ProductRepository {
	getProducts(): Promise<ProductDto[]>;
	getProductsByCategory(categoryId: string): Promise<ProductDto[]>;
	deleteProducts(id: string): Promise<void>;
	createProducts(product: ProductDto): Promise<ProductDto>;
	updateProducts(product: UpdateProductParams): Promise<UpdateProductResponse>;
}
