import logger from '@common/logger';
import {
	productFilterSchema,
	productSchema,
	updateProductSchema,
} from '@driver/schemas/productSchema';
import { InvalidProductException } from '@exceptions/invalidProductException';
import { Product } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';
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

	async createProducts(productDto: CreateProductParams): Promise<Product> {
		const { success } = productSchema.safeParse(productDto);

		if (!success) {
			throw new InvalidProductException(
				"There's a problem with parameters sent, check documentation"
			);
		}

		return this.productRepository.createProducts(productDto);
	}

	async updateProducts(product: UpdateProductParams): Promise<Product> {
		const { success } = updateProductSchema.safeParse(product);

		if (!success) {
			throw new InvalidProductException(
				"There's a problem with parameters sent, check documentation"
			);
		}

		logger.info(`Updating product: ${product.id}`);
		return this.productRepository.updateProducts(product);
	}
}
