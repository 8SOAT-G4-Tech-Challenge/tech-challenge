import { ProductDto } from '@src/adapter/driver/schemas/productSchema';
/* import { UpdateOrderParams } from '@ports/input/orders';
import { UpdateOrderResponse } from '@ports/output/orders'; */

export interface ProductRepository {
	getProducts(): Promise<ProductDto[]>;
	getProductsByCategory(categoryId: string): Promise<ProductDto[]>;
	deleteProducts(id: string): Promise<void>;
	createProducts(product: ProductDto): Promise<ProductDto>;
	/* updateProducts(product: UpdateOrderParams): Promise<UpdateOrderResponse>; */
}
