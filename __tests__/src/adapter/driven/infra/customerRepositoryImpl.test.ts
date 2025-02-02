import { CustomerMockBuilder } from '@tests/mocks/customer.mock-builder';
import { CustomerRepositoryImpl } from '@src/adapter/driven/infra';
import { prisma } from '@src/adapter/driven/infra/lib/prisma';
import { cacheService } from '@src/core/application/services/cacheService';

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));

jest.mock('@src/core/application/services/cacheService', () => ({
	cacheService: {
		get: jest.fn(),
		set: jest.fn(),
		del: jest.fn(),
	},
}));

describe('CustomerRepositoryImpl -> Test', () => {
	let repository: CustomerRepositoryImpl;

	beforeEach(() => {
		repository = new CustomerRepositoryImpl();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getCustomers', () => {
		test('should get customers from cache', async () => {
			const customers = [new CustomerMockBuilder().withDefaultValues().build()];

			jest.spyOn(cacheService, 'get').mockResolvedValue(customers);

			const response = await repository.getCustomers();

			expect(response).toEqual(customers);
		});

		test('should get customers', async () => {
			const customers = [new CustomerMockBuilder().withDefaultValues().build()];

			jest.spyOn(cacheService, 'get').mockResolvedValue(undefined);
			jest.spyOn(prisma.customer, 'findMany').mockResolvedValue(customers);

			const response = await repository.getCustomers();

			expect(response).toEqual(customers);
		});
	});

	describe('getCustomerById', () => {
		test('should get customer by ID', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.customer, 'findUnique').mockResolvedValue(customer);

			const response = await repository.getCustomerById(customer.id);

			expect(response).toEqual(customer);
		});
	});

	describe('getCustomerById', () => {
		test('should get customer by CPF', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.customer, 'findFirst').mockResolvedValue(customer);

			const response = await repository.getCustomerByCpf(customer.cpf);

			expect(response).toEqual(customer);
		});
	});

	describe('createCustomer', () => {
		test('should get customer by CPF', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.customer, 'create').mockResolvedValue(customer);

			const response = await repository.createCustomer(customer);

			expect(response).toEqual(customer);
		});
	});

	describe('deleteCustomer', () => {
		test('should delete customer', async () => {
			const customer = new CustomerMockBuilder().withDefaultValues().build();

			jest.spyOn(prisma.customer, 'delete').mockResolvedValue(customer);

			const response = await repository.deleteCustomer(customer);

			expect(response).toEqual(undefined);
		});
	});
});
