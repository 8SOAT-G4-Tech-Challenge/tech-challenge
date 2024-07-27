import { prisma } from '@driven/infra/lib/prisma';
import { ProductCategory } from '@models/productCategory';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';

export class ProductCategoryRepositoryImpl implements ProductCategoryRepository {
    async getProductCategories(): Promise<ProductCategory[]> {
		return prisma.productCategory.findMany({
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	};

	async createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory> {
		return prisma.productCategory.create({
			data: productCategory,
		});
	};

	async getProductCategoryByName(name: string): Promise<ProductCategory | null> {
		return prisma.productCategory.findUnique({
			where: { name }
		});
	};
}