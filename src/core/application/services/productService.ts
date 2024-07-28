import logger from '@common/logger';
import {
	ProductDto,
	productFilterSchema,
	productSchema,
} from '@driver/schemas/productSchema';
import { Product } from '@models/product';
import { ProductRepository } from '@ports/repository/productRepository';
import { ProductCategoryService } from '@services/productCategoryService';

export class ProductService {
	private readonly productCategoryService;

	private readonly productRepository;

	constructor(
		productCategoryService: ProductCategoryService,
		productRepository: ProductRepository
	) {
		this.productCategoryService = productCategoryService;
		this.productRepository = productRepository;
	}

	async getProducts(filters: any): Promise<Product[]> {
		productFilterSchema.parse(filters);
		if (filters.category) {
			logger.info(`Searching category by name: ${filters.category}`);
			const productCategory =
				await this.productCategoryService.getProductCategoryByName(
					filters.category
				);
			if (productCategory) {
				logger.info(
					`Success search product category ${JSON.stringify(productCategory)}`
				);
				return this.productRepository.getProductsByCategory(productCategory.id);
			}
			return [];
		}
		return this.productRepository.getProducts();
	}

	async deleteProducts(id: string): Promise<void> {
		try {
			await this.productRepository.deleteProducts(id);
		} catch (error) {
			throw new Error('An unexpected error occurred while deleting');
		}
	}

	async createProducts(productDto: ProductDto): Promise<ProductDto> {
		productSchema.parse(productDto);
		return this.productRepository.createProducts(productDto);
	}
}
