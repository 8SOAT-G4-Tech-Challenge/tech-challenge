import { ProductRepository } from '@ports/productRepository';
import { Product, ProductCategory } from '@prisma/client';

export class ProductService {
	constructor(private readonly productRepository: ProductRepository) { }

	async getProducts(): Promise<Product[]> {
		return this.productRepository.getProducts();
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productRepository.getProductCategories();
	}

	async createProductCategory(productCategoryDto: ProductCategory): Promise<ProductCategory> {
		// productCategoryDto = productCategorySchema.parse(productCategoryDto);
		return this.productRepository.createProductCategory({ ...productCategoryDto });
	}
}
