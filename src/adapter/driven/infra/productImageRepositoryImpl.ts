import { prisma } from '@driven/infra/lib/prisma';
import { DataNotFoundException } from '@exceptions/dataNotFound';
import { ProductImage } from '@models/productImage';
import { GetProductImageByIdParams } from '@ports/input/productImage';
import { ProductImageRepository } from '@ports/repository/productImageRepository';

export class ProductImageRepositoryImpl implements ProductImageRepository {
	async getProductImageById({
		id,
	}: GetProductImageByIdParams): Promise<ProductImage> {
		return prisma.productImage
			.findFirstOrThrow({
				where: {
					id,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(
					`Product Image with id: ${id} not found`
				);
			});
	}

	async createProductImage(productImage: ProductImage): Promise<ProductImage> {
		return prisma.productImage
			.create({
				data: productImage,
			})
			.catch(() => {
				throw new DataNotFoundException('Error creating product image');
			});
	}

	async deleteProductImageByProductId(productId: string): Promise<void> {
		await prisma.productImage
			.deleteMany({
				where: {
					productId,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(
					`Product Image with productId: ${productId} not found`
				);
			});
	}
}
