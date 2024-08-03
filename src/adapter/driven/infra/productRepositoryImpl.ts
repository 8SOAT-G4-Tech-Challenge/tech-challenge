import logger from '@common/logger';
import { prisma } from '@driven/infra/lib/prisma';
import { DataNotFoundException } from '@exceptions/dataNotFound';
import { Product } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';
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
			value: parseFloat(product.value.toString()),
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
			value: parseFloat(product.value.toString()),
		}));
	}

	async deleteProducts(id: string): Promise<void> {
		const findProduct = await prisma.product.findFirst({
			where: { id },
		});
		if (findProduct) {
			await prisma.productImage.deleteMany({
				where: { productId: findProduct.id },
			});
			await prisma.product.delete({
				where: { id },
			});
		}
	}

	async createProducts(product: CreateProductParams): Promise<Product> {
		const createdProducts = await prisma.product.create({
			data: {
				value: product.value,
				description: product.description,
				name: product.name,
				categoryId: product.categoryId,
			},
		});

		return {
			...createdProducts,
			value: parseFloat(product.value.toString()),
		};
	}

	async updateProducts(product: UpdateProductParams): Promise<Product> {
		const updatedProduct = await prisma.product
			.update({
				where: {
					id: product.id,
				},
				data: product,
			})
			.catch(() => {
				throw new DataNotFoundException(
					`Product with id: ${product.id} not found`
				);
			});

		logger.info(`Product updated: ${JSON.stringify(updatedProduct)}`);

		return {
			...updatedProduct,
			value: parseFloat(updatedProduct.value.toString()),
		};
	}

	async getProductById(id: string): Promise<Product> {
		const product = await prisma.product
			.findFirstOrThrow({
				where: {
					id,
				},
				include: {
					category: true,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(`Product with id: ${id} not found`);
			});

		return {
			...product,
			value: parseFloat(product.value.toString()),
		};
	}
}
