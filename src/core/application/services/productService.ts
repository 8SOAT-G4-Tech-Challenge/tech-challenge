import { ProductRepository } from '@ports/repository/productRepository';
import { Product } from '@prisma/client';
import { productFilterSchema } from '@driver/schemas/productSchema';
import { ProductCategoryService } from '@services/productCategoryService';
import logger from '@common/logger';

export class ProductService {
	constructor(private readonly productCategoryService: ProductCategoryService, 
		private readonly productRepository: ProductRepository) {}

	async getProducts(filters: any): Promise<Product[]> {
		productFilterSchema.parse(filters);
		if (filters.category) {
			logger.info(`Searching category by name: ${filters.category}`);
			const productCategory = await this.productCategoryService.getProductCategoryByName(filters.category);
			if (productCategory) {
				logger.info(`Success search product category ${JSON.stringify(productCategory)}`)
				return this.productRepository.getProductsByCategory(productCategory.id);
			} else {
				return [];
			}
		} else {
			return this.productRepository.getProducts();
		}
	}
}
