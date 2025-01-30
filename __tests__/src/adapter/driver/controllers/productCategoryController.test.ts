import { ProductCategoryMockBuilder } from '@src/__mocks__/product-category.mock-builder';
import { ProductCategoryController } from '@src/adapter/driver/controllers/productCategoryController';
import logger from '@src/core/common/logger';

describe('ProductCategoryController -> Test', () => {
	let controller: ProductCategoryController;
	let productCategoryService: any;

	beforeEach(() => {
		productCategoryService = {
			getProductCategories: jest.fn(),
			createProductCategory: jest.fn(),
			updateProductCategory: jest.fn(),
			deleteProductCategory: jest.fn(),
		};

		controller = new ProductCategoryController(productCategoryService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProductCategories', () => {
		test('should reply 200 and list all product categories', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			const req = {};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productCategoryService.getProductCategories.mockResolvedValue([
				productCategory,
			]);

			await controller.getProductCategories(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith([productCategory]);
			expect(loggerSpy).toHaveBeenCalledWith('Listing product categories');
		});

		test('should fail to list product categories', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { url: '/list-product-categories-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productCategoryService.getProductCategories.mockRejectedValue({
				message: 'error',
			});

			await controller.getProductCategories(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing for product categories: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/list-product-categories-mock',
				status: 500,
			});
		});
	});

	describe('createProductCategory', () => {
		test('should reply 201 and create product category', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			const req = { body: productCategory };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productCategoryService.createProductCategory.mockResolvedValue(
				productCategory
			);

			await controller.createProductCategory(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(201);
			expect(reply.send).toHaveBeenCalledWith(productCategory);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Creating product category: ${JSON.stringify(req.body)}`
			);
		});

		test('should fail to list product categories', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { body: {}, url: '/create-product-categories-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productCategoryService.createProductCategory.mockRejectedValue({
				message: 'error',
			});

			await controller.createProductCategory(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected when creating for product category: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/create-product-categories-mock',
				status: 500,
			});
		});
	});

	describe('updateProductCategories', () => {
		test('should reply 200 and create product category', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { id: '1' }, body: productCategory };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productCategoryService.updateProductCategory.mockResolvedValue(
				productCategory
			);

			await controller.updateProductCategories(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(productCategory);
			expect(loggerSpy).toHaveBeenCalledWith(
				'Updating product category with ID: 1'
			);
		});

		test('should fail to update product categories', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { id: '1' },
				body: {},
				url: '/update-product-categories-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productCategoryService.updateProductCategory.mockRejectedValue({
				message: 'error',
			});

			await controller.updateProductCategories(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when updating product category: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/update-product-categories-mock',
				status: 500,
			});
		});
	});

	describe('deleteProductCategories', () => {
		test('should reply 409 conflict', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { id: '1' }, body: productCategory };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productCategoryService.deleteProductCategory.mockResolvedValue(
				productCategory
			);

			await controller.deleteProductCategories(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(409);
			expect(reply.send).toHaveBeenCalledWith({
				error: 'Conflict',
				message: 'Product category has products associated',
			});
			expect(loggerSpy).toHaveBeenCalledWith('Deleting product category');
		});

		test('should reply 204 and delete product category', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { id: '1' }, body: productCategory };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productCategoryService.deleteProductCategory.mockResolvedValue();

			await controller.deleteProductCategories(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(204);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'Product category successfully deleted',
			});
			expect(loggerSpy).toHaveBeenCalledWith('Deleting product category');
		});

		test('should fail to delete product category', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = {
				params: { id: '1' },
				body: {},
				url: '/delete-product-categories-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productCategoryService.deleteProductCategory.mockRejectedValue({
				message: 'error',
			});

			await controller.deleteProductCategories(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected when deleting for product category: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/delete-product-categories-mock',
				status: 500,
			});
		});
	});
});
