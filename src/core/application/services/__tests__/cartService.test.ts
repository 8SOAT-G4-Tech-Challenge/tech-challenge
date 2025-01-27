import { AddItemToCartMockBuilder } from '@src/__mocks__/add-item-to-cart.mock-builder';
import { OrderItemMockBuilder } from '@src/__mocks__/order-item.mock-builder';
import { OrderMockBuilder } from '@src/__mocks__/order.mock-builder';
import { ProductMockBuilder } from '@src/__mocks__/product.mock-builder';
import logger from '@src/core/common/logger';

import { InvalidProductException } from '../../exceptions/invalidProductException';
import { CartService } from '../cartService';

describe('CartService -> Test', () => {
	let service: CartService;
	let mockOrderRepository: any;
	let mockProductRepository: any;
	let mockCartRepository: any;

	beforeEach(() => {
		mockOrderRepository = {
			getOrderById: jest.fn(),
		};
		mockProductRepository = {
			getProductById: jest.fn(),
		};
		mockCartRepository = {
			addItemToCart: jest.fn(),
		};

		service = new CartService(
			mockCartRepository,
			mockOrderRepository,
			mockProductRepository
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('addItemToCart', () => {
		test('should throw generic InvalidProductException', async () => {
			const product = new AddItemToCartMockBuilder()
				.withDefaultValues()
				// @ts-expect-error typescript
				.withOrderId(undefined)
				.build();

			const rejectedFunction = async () => {
				await service.addItemToCart(product);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				"There's a problem with parameters sent, check documentation"
			);
		});

		test('should throw quantity related InvalidProductException', async () => {
			const product = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.withQuantity(200)
				.build();

			const rejectedFunction = async () => {
				await service.addItemToCart(product);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidProductException);
			expect(rejectedFunction()).rejects.toThrow(
				'The quantity must be equal or less than 99'
			);
		});

		test('should test success path', async () => {
			const order = new OrderMockBuilder().withDefaultValues().build();
			const productItem = new ProductMockBuilder().withDefaultValues().build();
			const product = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();
			const result = new OrderItemMockBuilder()
				.withDefaultValues()
				.withValue(productItem.value * 2)
				.build();

			const loggerSpy = jest.spyOn(logger, 'info');

			(mockOrderRepository.getOrderById as jest.Mock).mockResolvedValue(order);
			(mockProductRepository.getProductById as jest.Mock).mockResolvedValue(
				productItem
			);
			(mockCartRepository.addItemToCart as jest.Mock).mockResolvedValue(result);

			const response = await service.addItemToCart(product);

			expect(mockOrderRepository.getOrderById).toHaveBeenCalledWith({
				id: product.orderId,
			});
			expect(mockProductRepository.getProductById).toHaveBeenCalledWith(
				product.productId
			);
			expect(mockCartRepository.addItemToCart).toHaveBeenCalledWith({
				...product,
				value: product.quantity * productItem.value,
			});
			expect(response).toEqual(result);
			expect(loggerSpy).toHaveBeenCalledWith(
				`Adding item to order: ${order.id}`
			);
		});
	});
});
