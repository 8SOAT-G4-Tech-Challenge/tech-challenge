import axios from 'axios';

import { OrderItemMockBuilder } from '@src/__mocks__/order-item.mock-builder';
import { OrderMockBuilder } from '@src/__mocks__/order.mock-builder';
import logger from '@src/core/common/logger';

import { InvalidMercadoPagoException } from '../../exceptions/invalidMercadoPagoException';
import { MercadoPagoService } from '../mercadoPagoService';

jest.mock('axios');

describe('MercadoPagoService -> Test', () => {
	const mockedAxiosResponse = {
		data: {
			qrData: '00020101021126510014BR.GOV.BCB.PIX',
			inStoreOrderId: '6ef4dc98-8096-4ace-87f0-ee863137ea8f',
		},
	};

	let service: MercadoPagoService;
	let cartService: any = jest.fn();
	let productService: any = jest.fn();
	let environmentService: any = jest.fn();

	beforeEach(() => {
		environmentService = {
			getMercadoPagoToken: jest.fn().mockReturnValue('mercadoPagoToken'),
			getMercadoPagoUserId: jest.fn().mockReturnValue('mercadoPagoUserId'),
			getMercadoPagoExternalPosId: jest
				.fn()
				.mockReturnValue('mercadoPagoExternalPosId'),
		};

		cartService = {
			getAllCartItemsByOrderId: jest.fn(),
		};

		productService = {
			getProductById: jest.fn(),
		};

		service = new MercadoPagoService(
			cartService,
			productService,
			environmentService
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createQrPaymentRequest', () => {
		test('should create QRCode and return QRCode data', async () => {
			jest.spyOn(axios, 'post').mockResolvedValue(mockedAxiosResponse);

			const order = new OrderMockBuilder().withDefaultValues().build();
			const orderItem = new OrderItemMockBuilder().withDefaultValues().build();

			const loggerSpy = jest.spyOn(logger, 'info');

			cartService.getAllCartItemsByOrderId.mockResolvedValue([orderItem]);
			productService.getProductById.mockResolvedValue(orderItem);

			const response = await service.createQrPaymentRequest(order.id, 200);

			expect(loggerSpy).toHaveBeenCalledWith('Creating QR Payment Request...');
			expect(cartService.getAllCartItemsByOrderId).toHaveBeenCalledWith(
				order.id
			);
			expect(productService.getProductById).toHaveBeenCalledWith(
				orderItem.productId
			);
			expect(loggerSpy).toHaveBeenCalledWith(
				'Making request to: https://api.mercadopago.com/instore/orders/qr/seller/collectors/mercadoPagoUserId/pos/mercadoPagoExternalPosId/qrs to collect qrData'
			);
			expect(response).toEqual(mockedAxiosResponse.data);
		});

		test('should throw InvalidMercadoPagoException', async () => {
			jest.spyOn(axios, 'post').mockRejectedValue({});

			const order = new OrderMockBuilder().withDefaultValues().build();
			const orderItem = new OrderItemMockBuilder().withDefaultValues().build();

			cartService.getAllCartItemsByOrderId.mockResolvedValue([orderItem]);
			productService.getProductById.mockResolvedValue(orderItem);

			const rejectedFunction = async () => {
				await service.createQrPaymentRequest(order.id, 200);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidMercadoPagoException);
			expect(rejectedFunction()).rejects.toThrow('Unexpected error occurred');
		});

		test('should throw InvalidMercadoPagoException with default details', async () => {
			jest.spyOn(axios, 'post').mockRejectedValue({ response: { data: {} } });
			jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

			const order = new OrderMockBuilder().withDefaultValues().build();
			const orderItem = new OrderItemMockBuilder().withDefaultValues().build();

			cartService.getAllCartItemsByOrderId.mockResolvedValue([orderItem]);
			productService.getProductById.mockResolvedValue(orderItem);

			const rejectedFunction = async () => {
				await service.createQrPaymentRequest(order.id, 200);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidMercadoPagoException);
			expect(rejectedFunction()).rejects.toThrow(
				'Error: Error details not provided, Message: Unknown error occurred'
			);
		});

		test('should throw InvalidMercadoPagoException with details', async () => {
			jest.spyOn(axios, 'post').mockRejectedValue({
				response: {
					data: {
						message: 'message',
						error: 'error',
					},
				},
			});
			jest.spyOn(axios, 'isAxiosError').mockReturnValue(true);

			const order = new OrderMockBuilder().withDefaultValues().build();
			const orderItem = new OrderItemMockBuilder().withDefaultValues().build();

			cartService.getAllCartItemsByOrderId.mockResolvedValue([orderItem]);
			productService.getProductById.mockResolvedValue(orderItem);

			const rejectedFunction = async () => {
				await service.createQrPaymentRequest(order.id, 200);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidMercadoPagoException);
			expect(rejectedFunction()).rejects.toThrow(
				'Error: error, Message: message'
			);
		});
	});
});
