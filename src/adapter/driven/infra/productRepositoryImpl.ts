import { prisma } from '@driven/infra/lib/prisma';
import { ProductRepository } from '@ports/repository/productRepository';
import { ProductDto } from '@src/adapter/driver/schemas/productSchema';

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
		/* const createdProducts = await prisma.product.create({ */
		const createdProducts = await prisma.product.create({
			data: product,
		});
		return {
			...createdProducts,
			amount: parseFloat(product.amount.toString()),
		};
	}
}

/*
	async updateProducts(
		product: UpdateProductParams
	): Promise<UpdateProductResponse> {
		const updatedProduct = await prisma.product
			.update({
				where: {
					id: product.id,
				},
				data: {
					status: product.status,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(
					`Order with id: ${product.id} not found`
				);
			});

		logger.info(`Product updated: ${JSON.stringify(updatedProduct)}`);

		return updatedProduct;
	} */
