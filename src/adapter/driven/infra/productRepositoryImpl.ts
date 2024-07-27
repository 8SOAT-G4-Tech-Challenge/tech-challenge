import { prisma } from '@driven/infra/lib/prisma';
import { Product } from '@models/product';
import { ProductRepository } from '@ports/repository/productRepository';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<Product[]> {
		const products = await prisma.product.findMany({
			include: {
				category: true,
			},
		});
		return products.map((product) => ({
			...product,
			amount: parseFloat(product.amount.toString()),
		}));
	}

	async getProductsByCategory(categoryId: string): Promise<Product[]> {
		const products = await prisma.product.findMany({
			where: { categoryId },
			include: {
				category: true,
			},
		});
		return products.map((product) => ({
			...product,
			amount: parseFloat(product.amount.toString()),
		}));
	}
}
