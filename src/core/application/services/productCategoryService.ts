import { productCategoryCreateUpdateSchema } from '@driver/schemas/productCategorySchema';
import { ProductCategory } from '@models/productCategory';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';

import { InvalidProductCategoryException } from '../exceptions/invalidProductCategoryException';
import { DeleteProductCategoryParams, UpdateProductCategoryParams } from '../ports/input/productCategory';

export class ProductCategoryService {
	private readonly productCategoryRepository;

	constructor(productCategoryRepository: ProductCategoryRepository) {
		this.productCategoryRepository = productCategoryRepository;
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productCategoryRepository.getProductCategories();
	}

	async getProductCategoryByName(
		category: string,
	): Promise<ProductCategory | null> {
		return this.productCategoryRepository.getProductCategoryByName(category);
	}

	async createProductCategory(
		productCategoryData: any,
	): Promise<ProductCategory> {
		productCategoryCreateUpdateSchema.parse(productCategoryData);
		return this.productCategoryRepository.createProductCategory(
			productCategoryData,
		);
	}

	async updateProductCategory(
		id: string,
		productCategoryData: UpdateProductCategoryParams
	): Promise<ProductCategory> {
		productCategoryCreateUpdateSchema.parse(productCategoryData);

		const existingProductCategory =
		await this.productCategoryRepository.getProductCategoryById(
			id,
		);

		if (!existingProductCategory) {
			throw new InvalidProductCategoryException(
				`Category Product with ID ${id} not found.`,
			);
		}

		return this.productCategoryRepository.updateProductCategory(
			id,
			productCategoryData
		);
	}

	async deleteProductCategory(
		deleteProductCategoryParams: DeleteProductCategoryParams,
	): Promise<void | ProductCategory> {
		const existingProductCategory =
			await this.productCategoryRepository.getProductCategoryById(
				deleteProductCategoryParams.id,
			);

		if (!existingProductCategory) {
			throw new InvalidProductCategoryException(
				`Category Product with ID ${deleteProductCategoryParams.id} not found.`,
			);
		}

		const productInProductCategory =
			await this.productCategoryRepository.getFirstProductByCategory(
				deleteProductCategoryParams.id,
			);

		if (productInProductCategory) {
			return productInProductCategory;
		}

		return this.productCategoryRepository.deleteProductCategories(
			deleteProductCategoryParams,
		);
	}
}
