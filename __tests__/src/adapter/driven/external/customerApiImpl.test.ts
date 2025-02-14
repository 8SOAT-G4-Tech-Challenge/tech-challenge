import { CustomerApiImpl } from '@src/adapter/driven/external/customerApiImpl';
import { CustomerMockBuilder } from '@tests/mocks/customer.mock-builder';

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

describe('CustomerApiImpl -> Test', () => {
	let client: CustomerApiImpl;

	beforeEach(() => {
		client = new CustomerApiImpl(baseURL);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getCustomers', () => {
		test('should throw generic error', async () => {
			mockedAxios.get.mockRejectedValue('error');

			const rejectedFunction = async () => {
				await client.getCustomers();
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Unexpected error while trying to get all customers'
			);
		});

		test('should throw axios error', async () => {
			mockedAxios.get.mockRejectedValue({
				response: { data: { message: '' }, status: 500 },
			});
			mockedIsAxiosError.mockReturnValue(true);

			const rejectedFunction = async () => {
				await client.getCustomers();
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Error while trying to get all customers: {"data":{"message":""},"status":500}'
			);
		});

		test('should get customers with success', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();
			const customers = [customer, customer, customer];

			mockedAxios.get.mockResolvedValue({ data: customers });

			const response = await client.getCustomers();

			expect(response).toEqual(customers);
		});
	});

	describe('getCustomerByProperty', () => {
		test('should throw generic error', async () => {
			mockedAxios.get.mockRejectedValue('error');

			const rejectedFunction = async () => {
				await client.getCustomerByProperty({ id: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Unexpected error while trying to get customer by property'
			);
		});

		test('should throw axios error', async () => {
			mockedAxios.get.mockRejectedValue({
				response: { data: { message: '' }, status: 500 },
			});
			mockedIsAxiosError.mockReturnValue(true);

			const rejectedFunction = async () => {
				await client.getCustomerByProperty({ id: '' });
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'Error while trying to get customer by property: {"data":{"message":""},"status":500}'
			);
		});

		test('should get customers with success', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			mockedAxios.get.mockResolvedValue({ data: customer });

			const response = await client.getCustomerByProperty({ id: customer.id });

			expect(response).toEqual(customer);
		});
	});
});
