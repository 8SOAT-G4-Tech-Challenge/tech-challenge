import { ProductMockBuilder } from '@src/__mocks__/product.mock-builder';
import { ProductController } from '@src/adapter/driver/controllers/productController';
import logger from '@src/core/common/logger';

describe('ProductController -> Test', () => {
	let controller: ProductController;
	let productService: any;

	beforeEach(() => {
		productService = {
			getProducts: jest.fn(),
			deleteProducts: jest.fn(),
			createProducts: jest.fn(),
			updateProducts: jest.fn(),
		};

		controller = new ProductController(productService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProducts', () => {
		test('should reply 200 and list all products by query', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = { query: { id: '1' } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productService.getProducts.mockResolvedValue([product]);

			await controller.getProducts(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith([product]);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Listing products with parameters: ${JSON.stringify(req.query)}`
			);
		});

		test('should reply 200 and list all products', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = {};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productService.getProducts.mockResolvedValue([product]);

			await controller.getProducts(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith([product]);
			expect(loggerSpy).toHaveBeenCalledWith('Listing products');
		});

		test('should fail to list products', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { url: '/list-products-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productService.getProducts.mockRejectedValue({
				message: 'error',
			});

			await controller.getProducts(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when listing for products: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/list-products-mock',
				status: 500,
			});
		});
	});

	describe('deleteProducts', () => {
		test('should reply 200 and delete product', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const req = { params: { id: '1' } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productService.deleteProducts.mockResolvedValue();

			await controller.deleteProducts(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'Product successfully deleted',
			});
			expect(loggerSpy).toHaveBeenCalledWith('Deleting product');
		});

		test('should fail to list products', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const req = { params: { id: '1' }, url: '/delete-products-mock' };
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productService.deleteProducts.mockRejectedValue({
				message: 'error',
			});

			await controller.deleteProducts(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected when deleting for product: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/delete-products-mock',
				status: 500,
			});
		});
	});

	describe('createProducts', () => {
		test('should reply 201 and create product', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = {
				parts: jest.fn().mockReturnValue([
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'non-file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
				]),
				files: { id: '1' },
				body: product,
			};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productService.createProducts.mockResolvedValue(product);

			await controller.createProducts(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(201);
			expect(reply.send).toHaveBeenCalledWith(product);
			expect(loggerSpy).toHaveBeenCalledWith('Creating product: ""');
		});

		test('should fail to update products', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = {
				parts: jest.fn().mockReturnValue([
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'non-file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
				]),
				files: { id: '1' },
				body: product,
				url: '/create-products-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productService.createProducts.mockRejectedValue({
				message: 'error',
			});

			await controller.createProducts(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected when creating for product: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/create-products-mock',
				status: 500,
			});
		});
	});

	describe('updateProducts', () => {
		test('should reply 201 and create product', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = {
				params: { id: '1' },
				parts: jest.fn().mockReturnValue([
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'non-file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
				]),
				files: { id: '1' },
				body: product,
			};
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			productService.updateProducts.mockResolvedValue(product);

			await controller.updateProducts(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(product);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Updating product ${req?.params?.id}`
			);
		});

		test('should fail to update products', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const product = new ProductMockBuilder().withDefaultValues().build();

			const req = {
				params: { id: '1' },
				parts: jest.fn().mockReturnValue([
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'file',
						toBuffer: jest.fn(),
						fieldname: 'fieldname',
						value: 'value',
					},
					{
						name: 'name',
						description: 'description',
						categoryId: 'categoryId',
						type: 'non-file',
						toBuffer: jest.fn(),
						fieldname: 'value',
						value: 'value',
					},
				]),
				files: { id: '1' },
				body: product,
				url: '/update-products-mock',
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			productService.updateProducts.mockRejectedValue({
				message: 'error',
			});

			await controller.updateProducts(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when trying to update product: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/update-products-mock',
				status: 500,
			});
		});
	});
});
