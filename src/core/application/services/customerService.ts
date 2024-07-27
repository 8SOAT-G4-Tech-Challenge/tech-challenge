import { Customer } from '@models/customer';
import { CustomerRepository } from '@ports/repository/customerRepository';
import { InvalidCustomerException } from '@src/core/application/exceptions/invalidCustomerException';
import { CustomerCreateUpdateParams } from '@src/core/domain/types/customer';

export class CustomerService {
	private readonly customerRepository;

	constructor(customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository;
	}

	async getCustomers(): Promise<Customer[]> {
		try {
			const costumers = await this.customerRepository.getCustomers();
			return costumers;
		} catch (error) {
			throw new Error(
				`An unexpected error occurred while fetching customers from the database: ${error.message}`
			);
		}
	}

	async getCustomerByProperty(property: {
		id?: string;
		cpf?: string;
	}): Promise<Customer | null> {
		try {
			if ('id' in property) {
				return await this.customerRepository.getCustomerById(property.id!);
			}
			if ('cpf' in property) {
				return await this.customerRepository.getCustomerByCpf(property.cpf!);
			}
			throw new InvalidCustomerException(
				'Provide a valid property to perform the search.'
			);
		} catch (error) {
			throw new Error(
				`An unexpected error occurred while fetching customer: ${error.message}`
			);
		}
	}

	async createCustomer(
		customerData: CustomerCreateUpdateParams
	): Promise<Customer> {
		try {
			if (!customerData.name && !customerData.email) {
				throw new InvalidCustomerException(
					'At least one of the fields "name" or "email" must be provided.'
				);
			}
			return this.customerRepository.createCustomer(customerData);
		} catch (error) {
			throw new Error(
				`An unexpected error occurred while creating a new customer: ${error.message}`
			);
		}
	}
}
