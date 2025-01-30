import { AddItemToCartMockBuilder } from '@src/__mocks__/add-item-to-cart.mock-builder';
import { CartController } from '@src/adapter/driver/controllers/cartController';
import logger from '@src/core/common/logger';

describe('CartController -> Test', () => {
	let controller: CartController;
	let cartService: any;

	beforeEach(() => {
		cartService = {
			addItemToCart: jest.fn(),
			updateCartItem: jest.fn(),
			deleteCartItem: jest.fn(),
		};

		controller = new CartController(cartService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('addItemToCart', () => {
		test('should add item to cart and reply 201', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { orderId: '1' }, body: { ...addItemToCart } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			cartService.addItemToCart.mockResolvedValue(addItemToCart);

			await controller.addItemToCart(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(201);
			expect(reply.send).toHaveBeenCalledWith(addItemToCart);
			expect(loggerSpy).toHaveBeenCalledWith('Adding item to order: 1');
		});

		test('should fail to add item to cart', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = {
				url: '/cart-mock',
				params: { orderId: '1' },
				body: { ...addItemToCart },
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			cartService.addItemToCart.mockRejectedValue({ message: 'error' });

			await controller.addItemToCart(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when trying to add product to cart: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/cart-mock',
				status: 500,
			});
		});
	});

	describe('updateCartItem', () => {
		test('should update cart item and reply 200', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { id: '1' }, body: { ...addItemToCart } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			cartService.updateCartItem.mockResolvedValue(addItemToCart);

			await controller.updateCartItem(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalledWith(addItemToCart);
			expect(loggerSpy).toHaveBeenCalledWith('Updating cart item 1');
		});

		test('should fail to update cart item', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = {
				url: '/update-cart-mock',
				params: { id: '1' },
				body: { ...addItemToCart },
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			cartService.updateCartItem.mockRejectedValue({ message: 'error' });

			await controller.updateCartItem(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when trying to update cart: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/update-cart-mock',
				status: 500,
			});
		});
	});

	describe('deleteCartItem', () => {
		test('should add item to cart and reply 201', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = { params: { id: '1' }, body: { ...addItemToCart } };
			const reply = { code: jest.fn().mockReturnThis(), send: jest.fn() };

			cartService.deleteCartItem.mockResolvedValue(true);

			await controller.deleteCartItem(req as any, reply as any);

			expect(reply.code).toHaveBeenCalledWith(200);
			expect(reply.send).toHaveBeenCalled();
			expect(loggerSpy).toHaveBeenCalledWith('Deleting cart item 1');
		});

		test('should fail to add item to cart', async () => {
			const loggerSpy = jest.spyOn(logger, 'error');

			const addItemToCart = new AddItemToCartMockBuilder()
				.withDefaultValues()
				.build();

			const req = {
				url: '/delete-cart-mock',
				params: { id: '1' },
				body: { ...addItemToCart },
			};
			const reply = {
				send: jest.fn(),
				status: jest.fn().mockReturnThis(),
			};

			cartService.deleteCartItem.mockRejectedValue({ message: 'error' });

			await controller.deleteCartItem(req as any, reply as any);

			expect(loggerSpy).toHaveBeenCalledWith(
				'Unexpected error when trying to delete cart: {"message":"error"}'
			);
			expect(reply.status).toHaveBeenCalledWith(500);
			expect(reply.send).toHaveBeenCalledWith({
				message: 'error',
				path: '/delete-cart-mock',
				status: 500,
			});
		});
	});
});
