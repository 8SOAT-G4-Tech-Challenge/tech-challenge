import { PaymentOrderApiImpl } from '@src/adapter/driven/external/paymentOrderApiImpl';
import { OrderMockBuilder } from '@tests/mocks/order.mock-builder';
import { PaymentOrderMockBuilder } from '@tests/mocks/payment-order-service.mock-builder';

const baseURL = 'http://localhost:3999';

const mockedAxios = {
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
};

const mockedIsAxiosError = jest.fn();

jest.mock('axios', () => ({
	...jest.requireActual('axios'),
	create: () => mockedAxios,
	isAxiosError: () => mockedIsAxiosError,
}));

describe('PaymentOrderApiImpl -> Test', () => {
	let client: PaymentOrderApiImpl;

	beforeEach(() => {
		client = new PaymentOrderApiImpl(baseURL);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getPaymentOrders', () => {
		test('should throw generic error', async () => {
			mockedAxios.get.mockRejectedValue('error');

			const rejectedFunction = async () => {
				await client.getPaymentOrders();
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Unexpected error while trying to get all payment orders'
			);
		});

		test('should throw axios error', async () => {
			mockedAxios.get.mockRejectedValue({
				response: { data: { message: '' }, status: 500 },
			});
			mockedIsAxiosError.mockReturnValue(true);

			const rejectedFunction = async () => {
				await client.getPaymentOrders();
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Error while trying to get all payment orders: {"data":{"message":""},"status":500}'
			);
		});

		test('should get all payment orders successfully', async () => {
			const paymentOrder = new PaymentOrderMockBuilder()
				.withDefaultValues()
				.build();

			mockedAxios.get.mockResolvedValue({ data: [paymentOrder] });

			const response = await client.getPaymentOrders();

			expect(response).toEqual([paymentOrder]);
		});
	});

	describe('getPaymentOrderById', () => {
		test('should throw generic error', async () => {
			mockedAxios.get.mockRejectedValue('error');

			const rejectedFunction = async () => {
				await client.getPaymentOrderById({ id: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Unexpected error while trying to get payment order by ID'
			);
		});

		test('should throw axios error', async () => {
			mockedAxios.get.mockRejectedValue({
				response: { data: { message: '' }, status: 500 },
			});
			mockedIsAxiosError.mockReturnValue(true);

			const rejectedFunction = async () => {
				await client.getPaymentOrderById({ id: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Error while trying to get payment order by ID: {"data":{"message":""},"status":500}'
			);
		});

		test('should get payment order by id successfully', async () => {
			const paymentOrder = new PaymentOrderMockBuilder()
				.withDefaultValues()
				.build();

			mockedAxios.get.mockResolvedValue({ data: paymentOrder });

			const response = await client.getPaymentOrderById({
				id: paymentOrder.id,
			});

			expect(response).toEqual(paymentOrder);
		});
	});

	describe('getPaymentOrderByOrderId', () => {
		test('should throw generic error', async () => {
			mockedAxios.get.mockRejectedValue('error');

			const rejectedFunction = async () => {
				await client.getPaymentOrderByOrderId({ orderId: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Unexpected error while trying to get payment order by order ID'
			);
		});

		test('should throw axios error', async () => {
			mockedAxios.get.mockRejectedValue({
				response: { data: { message: '' }, status: 500 },
			});
			mockedIsAxiosError.mockReturnValue(true);

			const rejectedFunction = async () => {
				await client.getPaymentOrderByOrderId({ orderId: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Error while trying to get payment order by order ID: {"data":{"message":""},"status":500}'
			);
		});

		test('should get payment order by order id successfully', async () => {
			const order = new OrderMockBuilder().withDefaultValues().build();
			const paymentOrder = new PaymentOrderMockBuilder()
				.withDefaultValues()
				.build();

			mockedAxios.get.mockResolvedValue({ data: paymentOrder });

			const response = await client.getPaymentOrderByOrderId({
				orderId: order.id,
			});

			expect(response).toEqual(paymentOrder);
		});
	});
});
