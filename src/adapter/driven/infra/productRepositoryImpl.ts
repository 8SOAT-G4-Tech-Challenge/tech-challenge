import { prisma } from '@driven/infra/lib/prisma';
import { Product } from '@models/product';
import { ProductRepository } from '@ports/repository/productRepository';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<Product[]> {
		return prisma.product.findMany({
			include: {
				category: true
			}
		});
	}

	async getProductsByCategory(categoryId: string): Promise<Product[]> {
		return prisma.product.findMany({
			where: { categoryId },
			include: {
				category: true
			}
		});
	}
}
