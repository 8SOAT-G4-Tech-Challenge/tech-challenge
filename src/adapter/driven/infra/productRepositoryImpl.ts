import logger from '@common/logger';
import { prisma } from '@driven/infra/lib/prisma';
import { DataNotFoundException } from '@exceptions/dataNotFound';
import { Product, ProductWithDetails } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';
import { ProductRepository } from '@ports/repository/productRepository';
import { Prisma } from '@prisma/client';
import { InvalidProductException } from '@src/core/application/exceptions/invalidProductException';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<ProductWithDetails[]> {
		const products = await prisma.product.findMany({
			include: {
				category: true,
				images: true,
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
				images: true,
			},
		});

		return products.map((product) => ({
			...product,
			value: parseFloat(product.value.toString()),
		}));
	}

	async getProductById(id: string): Promise<ProductWithDetails> {
		const product = await prisma.product
			.findFirstOrThrow({
				where: {
					id,
				},
				include: {
					category: true,
					images: true,
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
		const createdProducts = await prisma.product
			.create({
				data: {
					value: product.value,
					description: product.description,
					name: product.name,
					categoryId: product.categoryId,
				},
			})
			.catch((error) => {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === 'P2002') {
						throw new InvalidProductException(
							`Product with name: ${product.name} already exists`,
						);
					}
				}
				throw new InvalidProductException(
					'Error creating product',
					error.message,
				);
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
				data: {
					name: product.name,
					value: product.value,
					description: product.description,
					categoryId: product.categoryId,
				},
			});

		logger.info(`Product updated: ${JSON.stringify(updatedProduct)}`);

		return {
			...updatedProduct,
			value: parseFloat(updatedProduct.value.toString()),
		};
	}
}
