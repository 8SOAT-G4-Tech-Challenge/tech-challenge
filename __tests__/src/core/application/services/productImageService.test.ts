import { ProductImageMockBuilder } from '@src/__mocks__/product-image.mock-builder';
import { InvalidProductImageException } from '@src/core/application/exceptions/invalidProductImageException';
import { ProductImageService } from '@src/core/application/services/productImageService';

describe('ProductImageService -> Test', () => {
	let service: ProductImageService;
	let mockProductImageRepository: any;

	beforeEach(() => {
		mockProductImageRepository = {
			createProductImage: jest.fn(),
			getProductImageById: jest.fn(),
			deleteProductImageByProductId: jest.fn(),
		};

		service = new ProductImageService(mockProductImageRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getProductImageById', () => {
		test('should throw InvalidProductCategoryException', async () => {
			const rejectedFunction = async () => {
				// @ts-expect-error typescript
				await service.getProductImageById({ id: undefined });
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductImageException);
			expect(rejectedFunction()).rejects.toThrow(
				`Error listing product image by Id. Invalid Id: ${undefined}`
			);
		});

		test('should get all product categories', async () => {
			const productImage = new ProductImageMockBuilder()
				.withDefaultValues()
				.build();

			mockProductImageRepository.getProductImageById.mockResolvedValue(
				productImage
			);

			const response = await service.getProductImageById({
				id: productImage.id,
			});

			expect(
				mockProductImageRepository.getProductImageById
			).toHaveBeenCalledWith({ id: productImage.id });
			expect(response).toEqual(productImage);
		});
	});
});
