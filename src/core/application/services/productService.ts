import logger from '@common/logger';
import { productFilterSchema } from '@driver/schemas/productSchema';
import { Product } from '@models/product';
import { ProductRepository } from '@ports/repository/productRepository';
import { ProductCategoryService } from '@services/productCategoryService';

export class ProductService {
	constructor(private readonly productCategoryService: ProductCategoryService,
		private readonly productRepository: ProductRepository) {}

	async getProducts(filters: any): Promise<Product[]> {
		productFilterSchema.parse(filters);
		if (filters.category) {
			logger.info(`Searching category by name: ${filters.category}`);
			const productCategory =
				await this.productCategoryService.getProductCategoryByName(filters.category);
			if (productCategory) {
				logger.info(`Success search product category ${JSON.stringify(productCategory)}`);
				return this.productRepository.getProductsByCategory(productCategory.id);
			}
			return [];
		}
		return this.productRepository.getProducts();
	}
}
