import { DeleteCustomerParams } from '@application/ports/input/customers';
import { CustomerRepository } from '@application/ports/repository/customerRepository';
import { prisma } from '@driven/infra/lib/prisma';
import { CustomerDto } from '@driver/schemas/customerSchema';
import { Customer } from '@models/customer';
import { cacheService } from '@src/core/application/services/cacheService';

export class CustomerRepositoryImpl implements CustomerRepository {
	private readonly cacheKey = 'customers:list';

	private readonly expirationTime = 300;

	async getCustomers(): Promise<Customer[]> {
		const cacheData = await cacheService.get<Customer[]>(this.cacheKey);

		if (cacheData) {
			return cacheData;
		}

		const customers = await prisma.customer.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		await cacheService.set(this.cacheKey, customers, this.expirationTime);
		return customers;
	}

	async getCustomerById(id: string): Promise<Customer | null> {
		const customer = await prisma.customer.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return customer;
	}

	async getCustomerByCpf(cpf: string): Promise<Customer | null> {
		const customer = await prisma.customer.findFirst({
			where: { cpf },
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return customer;
	}

	async createCustomer(customer: CustomerDto): Promise<Customer> {
		const createdCustomer = await prisma.customer.create({
			data: customer,
		});

		return createdCustomer;
	}

	async deleteCustomer(
		deleteCustomerParams: DeleteCustomerParams
	): Promise<void> {
		await prisma.customer.delete({
			where: { id: deleteCustomerParams.id },
		});
	}
}
