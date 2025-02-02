import { ProductCategoryMockBuilder } from '@tests/mocks/product-category.mock-builder';
import { ProductMockBuilder } from '@tests/mocks/product.mock-builder';
import { ProductCategoryRepositoryImpl } from '@src/adapter/driven/infra';
import { prisma } from '@src/adapter/driven/infra/lib/prisma';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

jest.mock('@src/core/application/services/cacheService', () => ({
	cacheService: {
		get: jest.fn(),
		set: jest.fn(),
		del: jest.fn(),
	},
}));

describe('ProductCategoryRepositoryImpl -> Test', () => {
	let repository: ProductCategoryRepositoryImpl;

	beforeEach(() => {
		repository = new ProductCategoryRepositoryImpl();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProductCategories', () => {
		test('should get product categories', async () => {
			const productCategories = [
				new ProductCategoryMockBuilder().withDefaultValues().build(),
			];

			jest
				.spyOn(prisma.productCategory, 'findMany')
				.mockResolvedValue(productCategories as any);

			const response = await repository.getProductCategories();

			expect(response).toEqual(productCategories);
		});
	});

	describe('createProductCategory', () => {
		test('should create product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest
				.spyOn(prisma.productCategory, 'create')
				.mockResolvedValue(productCategory as any);

			const response = await repository.createProductCategory(productCategory);

			expect(response).toEqual(productCategory);
		});
	});

	describe('updateProductCategory', () => {
		test('should update product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest
				.spyOn(prisma.productCategory, 'update')
				.mockResolvedValue(productCategory as any);

			const response = await repository.updateProductCategory(
				productCategory.id,
				productCategory
			);

			expect(response).toEqual(productCategory);
		});
	});

	describe('getProductCategoryByName', () => {
		test('should update product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest
				.spyOn(prisma.productCategory, 'findFirst')
				.mockResolvedValue(productCategory as any);

			const response = await repository.getProductCategoryByName(
				productCategory.name
			);

			expect(response).toEqual(productCategory);
		});
	});

	describe('getProductCategoryById', () => {
		test('should update product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest
				.spyOn(prisma.productCategory, 'findUnique')
				.mockResolvedValue(productCategory as any);

			const response = await repository.getProductCategoryById(
				productCategory.id
			);

			expect(response).toEqual(productCategory);
		});
	});

	describe('getFirstProductByCategory', () => {
		test('should return product when product category has associated products', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();
			const product = new ProductMockBuilder().withDefaultValues().build();

			jest
				.spyOn(prisma.productCategory, 'findUnique')
				.mockResolvedValue({ ...productCategory, products: [product] } as any);

			const response = await repository.getFirstProductByCategory(
				productCategory.id
			);

			expect(response).toEqual(product);
		});

		test('should return null when product category doesnt has product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest
				.spyOn(prisma.productCategory, 'findUnique')
				.mockResolvedValue(productCategory as any);

			const response = await repository.getFirstProductByCategory(
				productCategory.id
			);

			expect(response).toEqual(null);
		});
	});

	describe('deleteProductCategories', () => {
		test('should delete product category', async () => {
			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			jest.spyOn(prisma.productCategory, 'delete').mockResolvedValue({} as any);

			const response = await repository.deleteProductCategories({
				id: productCategory.id,
			});

			expect(response).toEqual(undefined);
		});
	});
});
