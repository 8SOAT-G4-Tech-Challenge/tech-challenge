import { prisma } from '@driven/infra/lib/prisma';
import { ProductRepository } from '@ports/repository/productRepository';
import { ProductDto } from '@src/adapter/driver/schemas/productSchema';
import { DataNotFoundException } from '@src/core/application/exceptions/dataNotFound';
import { UpdateProductParams } from '@src/core/application/ports/input/products';
import { UpdateProductResponse } from '@src/core/application/ports/output/products';
import logger from '@src/core/common/logger';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<ProductDto[]> {
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

	async getProductsByCategory(categoryId: string): Promise<ProductDto[]> {
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

	async createProducts(product: ProductDto): Promise<ProductDto> {
		const createdProducts = await prisma.product.create({
			data: product,
		});
		return {
			...createdProducts,
			amount: parseFloat(product.amount.toString()),
		};
	}

	async updateProducts(
		product: UpdateProductParams
	): Promise<UpdateProductResponse> {
		const { id, name, amount, description, categoryId } = product;

		const updateData: Partial<UpdateProductParams> = {};

		if (name !== undefined) {
			updateData.name = name;
		}
		if (amount !== undefined) {
			updateData.amount = parseFloat(amount.toString());
		}
		if (description !== undefined) {
			updateData.description = description;
		}
		if (categoryId !== undefined) {
			updateData.categoryId = categoryId;
		}

		updateData.updatedAt = new Date();

		const updatedProduct = await prisma.product
			.update({
				where: {
					id,
				},
				data: updateData,
			})
			.catch(() => {
				throw new DataNotFoundException(`Product with id: ${id} not found`);
			});

		logger.info(`Product updated: ${JSON.stringify(updatedProduct)}`);

		return updatedProduct;
	}
}
