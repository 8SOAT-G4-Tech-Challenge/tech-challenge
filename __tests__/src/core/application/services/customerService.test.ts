import { CustomerMockBuilder } from '@src/__mocks__/customer.mock-builder';
import { InvalidCustomerException } from '@src/core/application/exceptions/invalidCustomerException';
import { CustomerService } from '@src/core/application/services/customerService';

jest.mock('@src/adapter/driven/infra/lib/redis', () => ({
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
}));

describe('CustomerService -> Test', () => {
	let service: CustomerService;
	let mockCustomerRepository: any;

	beforeEach(() => {
		mockCustomerRepository = {
			getCustomers: jest.fn(),
			getCustomerById: jest.fn(),
			getCustomerByCpf: jest.fn(),
			createCustomer: jest.fn(),
			deleteCustomer: jest.fn(),
		};

		service = new CustomerService(mockCustomerRepository);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getCustomers', () => {
		test('should return all customers', async () => {
			const customers = [
				new CustomerMockBuilder().withDefaultValues().build(),
				new CustomerMockBuilder().withDefaultValues().build(),
			];

			(mockCustomerRepository.getCustomers as jest.Mock).mockResolvedValue(
				customers
			);

			const response = await service.getCustomers();

			expect(mockCustomerRepository.getCustomers).toHaveBeenCalled();
			expect(response).toEqual(customers);
		});
	});

	describe('getCustomerByProperty', () => {
		test('should return customers by ID', async () => {
			const id = '1a024141-0b90-4c1c-b836-7e52ce99faf7';

			const customers = [
				new CustomerMockBuilder().withDefaultValues().build(),
				new CustomerMockBuilder().withDefaultValues().build(),
			];

			(mockCustomerRepository.getCustomerById as jest.Mock).mockResolvedValue(
				customers
			);

			const response = await service.getCustomerByProperty({ id });

			expect(mockCustomerRepository.getCustomerById).toHaveBeenCalledWith(id);
			expect(response).toEqual(customers);
		});

		test('should return customers by document', async () => {
			const document = '12345678910';

			const customers = [
				new CustomerMockBuilder().withDefaultValues().build(),
				new CustomerMockBuilder().withDefaultValues().build(),
			];

			(mockCustomerRepository.getCustomerByCpf as jest.Mock).mockResolvedValue(
				customers
			);

			const response = await service.getCustomerByProperty({ cpf: document });

			expect(mockCustomerRepository.getCustomerByCpf).toHaveBeenCalledWith(
				document
			);
			expect(response).toEqual(customers);
		});

		test('should throw InvalidCustomerException', async () => {
			const rejectedFunction = async () => {
				await service.getCustomerByProperty({});
			};

			expect(rejectedFunction()).rejects.toThrow(Error);
			expect(rejectedFunction()).rejects.toThrow(
				'An unexpected error occurred while fetching customer: Provide a valid property to perform the search.'
			);
		});
	});

	describe('createCustomer', () => {
		test('should throw InvalidCustomerException with customer already exists message', async () => {
			const customer = new CustomerMockBuilder()
				.withDefaultValues()
				// @ts-expect-error typescript
				.withName(undefined)
				.build();

			(mockCustomerRepository.getCustomerByCpf as jest.Mock).mockResolvedValue(
				customer
			);

			const rejectedFunction = async () => {
				await service.createCustomer(customer);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidCustomerException);
			expect(rejectedFunction()).rejects.toThrow(
				'A customer with this CPF already exists.'
			);
		});

		test('should create customer and return it', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			(mockCustomerRepository.getCustomerByCpf as jest.Mock).mockResolvedValue(
				undefined
			);
			(mockCustomerRepository.createCustomer as jest.Mock).mockResolvedValue(
				customer
			);

			const response = await service.createCustomer(customer);

			expect(mockCustomerRepository.createCustomer).toHaveBeenCalledWith(
				customer
			);
			expect(response).toEqual(customer);
		});
	});

	describe('deleteCustomer', () => {
		test('should throw InvalidCustomerException with customer not found', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			(mockCustomerRepository.getCustomerById as jest.Mock).mockResolvedValue(
				undefined
			);

			const rejectedFunction = async () => {
				await service.deleteCustomer(customer);
			};

			expect(rejectedFunction()).rejects.toThrow(InvalidCustomerException);
			expect(rejectedFunction()).rejects.toThrow(
				`Customer with ID ${customer.id} not found.`
			);
		});

		test('should delete customer', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			(mockCustomerRepository.getCustomerById as jest.Mock).mockResolvedValue(
				customer
			);
			(mockCustomerRepository.deleteCustomer as jest.Mock).mockResolvedValue(
				customer
			);

			const response = await service.deleteCustomer(customer);

			expect(mockCustomerRepository.getCustomerById).toHaveBeenCalledWith(
				customer.id
			);
			expect(mockCustomerRepository.deleteCustomer).toHaveBeenCalledWith(
				customer
			);
			expect(response).toEqual(customer);
		});
	});
});
