import { Product } from '@src/core/domain/models/product';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    getProductsByCategory(categoryId: string): Promise<Product[]>;
}
