import { CreateProductMockBuilder } from '@src/__mocks__/create-product.mock-builder';
import { ProductCategoryMockBuilder } from '@src/__mocks__/product-category.mock-builder';
import { ProductMockBuilder } from '@src/__mocks__/product.mock-builder';
import { DataNotFoundException } from '@src/core/application/exceptions/dataNotFound';
import { InvalidProductException } from '@src/core/application/exceptions/invalidProductException';
import { ProductService } from '@src/core/application/services/productService';
import logger from '@src/core/common/logger';

describe('ProductService -> Test', () => {
	let service: ProductService;
	let productCategoryService: any;
	let productRepository: any;
	let productImageRepository: any;
	let fileStorage: any;

	beforeEach(() => {
		productCategoryService = {
			getProductCategoryByName: jest.fn(),
		};

		productRepository = {
			getProducts: jest.fn(),
			getProductById: jest.fn(),
			getProductsByCategory: jest.fn(),
			deleteProducts: jest.fn(),
			createProducts: jest.fn(),
			updateProducts: jest.fn(),
		};

		productImageRepository = {
			deleteProductImageByProductId: jest.fn(),
			createProductImage: jest.fn(),
		};

		fileStorage = {
			saveFile: jest.fn(),
			deleteDirectory: jest.fn(),
		};

		service = new ProductService(
			productCategoryService,
			productRepository,
			productImageRepository,
			fileStorage
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProducts', () => {
		test('should get all products', async () => {
			const products = [new ProductMockBuilder().withDefaultValues().build()];

			productRepository.getProducts.mockResolvedValue(products);

			const response = await service.getProducts({});

			expect(productRepository.getProducts).toHaveBeenCalled();
			expect(response).toEqual(products);
		});

		test('should not get products by product category', async () => {
			productCategoryService.getProductCategoryByName.mockResolvedValue(
				undefined
			);

			const response = await service.getProducts({ category: 'Pizzas' });

			expect(
				productCategoryService.getProductCategoryByName
			).toHaveBeenCalledWith('Pizzas');
			expect(response).toEqual([]);
		});

		test('should get products by product category', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const productCategory = new ProductCategoryMockBuilder()
				.withDefaultValues()
				.build();
			const products = [new ProductMockBuilder().withDefaultValues().build()];

			productCategoryService.getProductCategoryByName.mockResolvedValue(
				productCategory
			);
			productRepository.getProductsByCategory.mockResolvedValue(products);

			const response = await service.getProducts({ category: 'Pizzas' });

			expect(
				productCategoryService.getProductCategoryByName
			).toHaveBeenCalledWith('Pizzas');
			expect(productRepository.getProductsByCategory).toHaveBeenCalled();
			expect(response).toEqual(products);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Success search product category ${JSON.stringify(productCategory)}`
			);
		});
	});

	describe('getProductById', () => {
		test('should get product by ID', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.getProductById.mockResolvedValue(product);

			const response = await service.getProductById(product.id);

			expect(productRepository.getProductById).toHaveBeenCalledWith(product.id);
			expect(response).toEqual(product);
		});
	});

	describe('deleteProducts', () => {
		test('should throw InvalidProductException', async () => {
			const rejectedFunction = async () => {
				// @ts-expect-error typescript
				await service.deleteProducts({ id: undefined });
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				'Error deleting product by Id. Invalid Id: undefined'
			);
		});

		test('should throw InvalidProductException when product is not found', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.getProductById.mockResolvedValue(undefined);

			const rejectedFunction = async () => {
				await service.deleteProducts({ id: product.id });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'An unexpected error occurred while deleting'
			);
		});

		test('should delete product succesfully', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.getProductById.mockResolvedValue(product);
			productRepository.deleteProducts.mockResolvedValue();
			fileStorage.deleteDirectory.mockResolvedValue();

			await service.deleteProducts({ id: product.id });

			expect(loggerSpy).toHaveBeenCalledWith(
				`Directory for product ${product.id} has been removed.`
			);
		});
	});

	describe('createProducts', () => {
		test('should throw InvalidProductException', async () => {
			const createProduct = new CreateProductMockBuilder()
				.withDefaultValues()
				.build();

			const rejectedFunction = async () => {
				await service.createProducts({
					...createProduct,
					// @ts-expect-error typescript
					categoryId: undefined,
				});
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				"There's a problem with parameters sent, check documentation"
			);
		});

		test('should create product without image', async () => {
			const createProduct = new CreateProductMockBuilder()
				.withDefaultValues()
				.withImages([])
				.build();
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.createProducts.mockResolvedValue(product);

			const result = await service.createProducts(createProduct);

			expect(result).toEqual(product);
		});

		test('should create product with image', async () => {
			const createProduct = new CreateProductMockBuilder()
				.withDefaultValues()
				.build();
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.createProducts.mockResolvedValue(product);

			const result = await service.createProducts(createProduct);

			expect(result).toEqual(product);
		});
	});

	describe('updateProducts', () => {
		test('should throw InvalidProductException', async () => {
			const product = new CreateProductMockBuilder()
				.withDefaultValues()
				.withImages([])
				.build();

			const rejectedFunction = async () => {
				await service.updateProducts({
					...product,
					// @ts-expect-error typescript
					id: undefined,
				});
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				"There's a problem with parameters sent, check documentation"
			);
		});

		test('should throw DataNotFoundException when product is not found', async () => {
			const product = new CreateProductMockBuilder()
				.withDefaultValues()
				.build();

			productRepository.getProductById.mockResolvedValue();

			const rejectedFunction = async () => {
				// @ts-expect-error typescript
				await service.updateProducts({
					...product,
				});
			};

			expect(rejectedFunction()).rejects.toThrow(DataNotFoundException);
			expect(rejectedFunction()).rejects.toThrow(
				`Product with id ${product.id} does not exist`
			);
		});

		test('should update product', async () => {
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.updateProducts.mockResolvedValue(product);
			productRepository.getProductById.mockResolvedValue(product);

			const result = await service.updateProducts(product);

			expect(result).toEqual(product);
			expect(productRepository.updateProducts).toHaveBeenCalledWith(product);
		});

		test('should update product with image', async () => {
			const createProduct = new CreateProductMockBuilder()
				.withDefaultValues()
				.build();
			const product = new ProductMockBuilder().withDefaultValues().build();

			productRepository.getProductById.mockResolvedValue(createProduct);
			productRepository.updateProducts.mockResolvedValue(product);
			fileStorage.deleteDirectory.mockResolvedValue();
			productImageRepository.deleteProductImageByProductId.mockResolvedValue();

			// @ts-expect-error typescript
			const result = await service.updateProducts(createProduct);

			expect(result).toEqual(product);
		});

		test('should update product without image', async () => {
			const createProduct = new CreateProductMockBuilder()
				.withDefaultValues()
				.build();
			const product = new CreateProductMockBuilder()
				.withDefaultValues()
				.withImages([])
				.build();

			productRepository.getProductById.mockResolvedValue(createProduct);
			productRepository.updateProducts.mockResolvedValue(product);
			fileStorage.deleteDirectory.mockResolvedValue();
			productImageRepository.deleteProductImageByProductId.mockResolvedValue();

			// @ts-expect-error typescript
			const result = await service.updateProducts(product);

			expect(result).toEqual(product);
		});
	});
});
