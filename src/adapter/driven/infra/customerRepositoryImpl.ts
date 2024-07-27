import { prisma } from '@driven/infra/lib/prisma';
import { CustomerDto } from '@src/adapter/driver/schemas/customerSchema';
import { CustomerRepository } from '@src/core/application/ports/repository/customerRepository';
import { Customer } from '@src/core/domain/models/customer';

export class CustomerRepositoryImpl implements CustomerRepository {
	async getCustomers(): Promise<Customer[]> {
		const costumers = await prisma.customer.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return costumers;
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

	async deleteCustomer(id: string): Promise<void>{
		await prisma.customer.delete({
			where: { id },
		});
	}
}
