import { prisma } from '@driven/infra/lib/prisma';
import { Product } from '@models/product';
import { ProductCategory } from '@models/productCategory';
import { ProductRepository } from '@ports/repository/productRepository';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<Product[]> {
		return prisma.product.findMany({
			select: {
				id: true,
				name: true,
				amount: true,
				description: true,
				category: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return prisma.productCategory.findMany({
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory> {
		return prisma.productCategory.create({
			data: productCategory,
		});
	}
}
