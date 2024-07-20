import { CustomerRepository } from '@ports/customerRepository';
import { Customer } from '@models/customer';
import { prisma } from '@driven/infra/lib/prisma';

export class CustomerRepositoryImpl implements CustomerRepository {
	async getCustomers(): Promise<Customer[]> {
		return prisma.customer.findMany();
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

	async createCustomer(customer: Customer): Promise<Customer> {
		const createdCustomer = await prisma.customer.create({
			data: customer,
		});

		return createdCustomer;
	}
}
