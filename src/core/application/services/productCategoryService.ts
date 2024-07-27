import { productCategoryCreateSchema } from '@driver/schemas/productCategorySchema';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';
import { ProductCategory } from '@prisma/client';

export class ProductCategoryService {
	constructor(private readonly productCategoryRepository: ProductCategoryRepository) {}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productCategoryRepository.getProductCategories();
	}

	async getProductCategoryByName(category: string): Promise<ProductCategory | null> {
		return this.productCategoryRepository.getProductCategoryByName(category);
	}

	async createProductCategory(productCategoryData: any): Promise<ProductCategory> {
		productCategoryCreateSchema.parse(productCategoryData);
		return this.productCategoryRepository.createProductCategory(productCategoryData);
	}
}
