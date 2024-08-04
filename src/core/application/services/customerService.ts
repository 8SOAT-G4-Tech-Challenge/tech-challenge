import { StatusCodes } from 'http-status-codes';

import { InvalidCustomerException } from '@exceptions/invalidCustomerException';
import { Customer } from '@models/customer';
import {
	DeleteCustomerParams,
	GetCustomerByPropertyParams,
} from '@ports/input/customers';
import { CustomerRepository } from '@ports/repository/customerRepository';
import {
	CustomerDto,
	customerSchema,
} from '@src/adapter/driver/schemas/customerSchema';

export class CustomerService {
	private readonly customerRepository;

	constructor(customerRepository: CustomerRepository) {
		this.customerRepository = customerRepository;
	}

	async getCustomers(): Promise<Customer[]> {
		const costumers = await this.customerRepository.getCustomers();
		return costumers;
	}

	async getCustomerByProperty(
		getCustomerByPropertyParams: GetCustomerByPropertyParams
	): Promise<Customer | null> {
		try {
			if ('id' in getCustomerByPropertyParams) {
				return await this.customerRepository.getCustomerById(
					getCustomerByPropertyParams.id!
				);
			}
			if ('cpf' in getCustomerByPropertyParams) {
				return await this.customerRepository.getCustomerByCpf(
					getCustomerByPropertyParams.cpf!
				);
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

	async createCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
		customerSchema.parse(customerDto);

		const existingCustomer = await this.customerRepository.getCustomerByCpf(
			customerDto.cpf
		);
		if (existingCustomer) {
			throw new InvalidCustomerException(
				'A customer with this CPF already exists.'
			);
		}

		return this.customerRepository.createCustomer(customerDto);
	}

	async deleteCustomer(
		deleteCustomerParams: DeleteCustomerParams
	): Promise<void> {
		const existingCustomer = await this.customerRepository.getCustomerById(
			deleteCustomerParams.id
		);

		if (!existingCustomer) {
			throw new InvalidCustomerException(
				`Customer with ID ${deleteCustomerParams.id} not found.`,
				StatusCodes.NOT_FOUND
			);
		}

		return this.customerRepository.deleteCustomer(deleteCustomerParams);
	}
}
