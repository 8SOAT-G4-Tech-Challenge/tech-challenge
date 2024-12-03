import { prisma } from '@driven/infra/lib/prisma';
import { ProductCategory } from '@models/productCategory';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';
import {
	DeleteProductCategoryParams,
	UpdateProductCategoryParams,
} from '@src/core/application/ports/input/productCategory';
import { Product } from '@src/core/domain/models/product';

export class ProductCategoryRepositoryImpl
implements ProductCategoryRepository {
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

	async updateProductCategory(
		id: string,
		productCategory: UpdateProductCategoryParams
	): Promise<ProductCategory> {
		return prisma.productCategory.update({
			where: { id },
			data: productCategory,
		});
	}

	async getProductCategoryByName(
		nameFilter: string
	): Promise<ProductCategory | null> {
		return prisma.productCategory.findFirst({
			where: {
				name: {
					equals: nameFilter,
					mode: 'insensitive',
				},
			},
		});
	}

	async getProductCategoryById(id: string): Promise<ProductCategory | null> {
		const productCategory = await prisma.productCategory.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return productCategory;
	}

	async getFirstProductByCategory(id: string): Promise<Product | null> {
		const productCategory = await prisma.productCategory.findUnique({
			where: { id },
			include: {
				products: {
					take: 1,
				},
			},
		});

		if (productCategory?.products && productCategory.products.length > 0) {
			return {
				...productCategory.products[0],
				value: parseFloat(productCategory.products[0].value.toString()),
			} as Product;
		}

		return null;
	}

	async deleteProductCategories(
		deleteProductCategoryParams: DeleteProductCategoryParams
	): Promise<void> {
		await prisma.productCategory.delete({
			where: { id: deleteProductCategoryParams.id },
		});
	}
}
