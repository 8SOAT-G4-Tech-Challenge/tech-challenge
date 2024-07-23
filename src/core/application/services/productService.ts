import { ProductRepository } from '@ports/repository/productRepository';
import {
	productCategorySchema,
	ProductCategoryDto,
} from '@driver/schemas/productCategorySchema';
import { Product, ProductCategory } from '@prisma/client';

export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	async getProducts(): Promise<Product[]> {
		return [];
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productRepository.getProductCategories();
	}

	async createProductCategory(
		productCategoryDto: ProductCategoryDto
	): Promise<ProductCategory> {
		productCategoryDto = productCategorySchema.parse(productCategoryDto);
		return this.productRepository.createProductCategory({
			...productCategoryDto,
		});
	}
}
