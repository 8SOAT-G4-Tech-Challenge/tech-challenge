import { Prisma } from '@prisma/client';
import { ProductMockBuilder } from '@tests/mocks/product.mock-builder';
import { ProductRepositoryImpl } from '@src/adapter/driven/infra';
import { prisma } from '@src/adapter/driven/infra/lib/prisma';
import { DataNotFoundException } from '@src/core/application/exceptions/dataNotFound';
import { InvalidProductException } from '@src/core/application/exceptions/invalidProductException';
import logger from '@src/core/common/logger';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

describe('ProductRepositoryImpl -> Test', () => {
	let repository: ProductRepositoryImpl;

	beforeEach(() => {
		repository = new ProductRepositoryImpl();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProducts', () => {
		test('should get products', async () => {
			const products = [new ProductMockBuilder().withDefaultValues().build()];

			jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products as any);

			const response = await repository.getProducts();

			expect(response).toEqual(products);
		});
	});

	describe('getProductsByCategory', () => {
		test('should get products by category', async () => {
			const products = [new ProductMockBuilder().withDefaultValues().build()];

			jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products as any);

			const response = await repository.getProductsByCategory('');

			expect(response).toEqual(products);
		});
	});

	describe('getProductById', () => {
		test('should get products by ID', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest
				.spyOn(prisma.product, 'findFirstOrThrow')
				.mockResolvedValue(product as any);

			const response = await repository.getProductById('');

			expect(response).toEqual(product);
		});

		test('should throw DataNotFoundException', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.product, 'findFirstOrThrow').mockRejectedValue('error');

			const rejectedFunction = async () => {
				await repository.getProductById(product.id);
			};

			expect(rejectedFunction()).rejects.toThrow(DataNotFoundException);
			expect(rejectedFunction()).rejects.toThrow(
				`Product with id: ${product.id} not found`
			);
		});
	});

	describe('deleteProducts', () => {
		test('should delete product and images', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.product, 'findFirst').mockResolvedValue(product as any);
			jest.spyOn(prisma.product, 'delete').mockResolvedValue({} as any);
			jest
				.spyOn(prisma.productImage, 'deleteMany')
				.mockResolvedValue({} as any);

			const response = await repository.deleteProducts(product.id);

			expect(response).toEqual(undefined);
		});
	});

	describe('createProducts', () => {
		test('should create product', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.product, 'create').mockResolvedValue(product as any);

			const response = await repository.createProducts(product);

			expect(response).toEqual(product);
		});

		test('should throw InvalidProductException', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest
				.spyOn(prisma.product, 'create')
				.mockRejectedValue({ message: 'error' });

			const rejectedFunction = async () => {
				await repository.createProducts(product);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				'Error creating product: {"message":"error"}'
			);
		});

		test('should throw DataNotFoundException when product already exists', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.product, 'create').mockRejectedValue(
				new Prisma.PrismaClientKnownRequestError('error', {
					code: 'P2002',
					clientVersion: '20',
				})
			);

			const rejectedFunction = async () => {
				await repository.createProducts(product);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				`Product with name: ${product.name} already exists`
			);
		});
	});

	describe('updateProducts', () => {
		test('should get products by ID', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.product, 'update').mockResolvedValue(product as any);

			const response = await repository.updateProducts(product);

			expect(response).toEqual(product);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Product updated: ${JSON.stringify(product)}`
			);
		});
	});
});
