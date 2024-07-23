import { ProductRepository } from '@ports/productRepository';
import { Product, ProductCategory } from '@prisma/client';
import { productCategoryCreateSchema, productCategoryFilters } from '@driver/schemas/productCategorySchema';
import { productFilterSchema } from '@driver/schemas/productSchema';
import { InvalidProductCategoryException } from '@src/core/application/exceptions/invalidProductCategoryException'; 
import logger from '@src/core/common/logger';

export class ProductService {
	constructor(private readonly productRepository: ProductRepository) { }

	async getProducts(filters: any): Promise<Product[]> {
		productFilterSchema.parse(filters);
		if (filters.category) {
			logger.info(`Searching category by name: ${filters.category}`);
			const productCategory = await this.productRepository.getProductCategoryByName(filters.category);
			if (productCategory) {
				logger.info(`Success search product category ${JSON.stringify(productCategory)}`)
				return this.productRepository.getProductsByCategory(productCategory.id);
			} else {
				throw new InvalidProductCategoryException(`Error listing products by category. Invalid category: ${filters.category}`);
			}
		} else {
			return this.productRepository.getProducts();
		}
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productRepository.getProductCategories();
	}

	async createProductCategory(productCategoryData: any): Promise<ProductCategory> {
		productCategoryData = productCategoryCreateSchema.parse(productCategoryData);
		return this.productRepository.createProductCategory(productCategoryData);
	}
}
