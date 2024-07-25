import { InvalidCustomerException } from '@driver/exceptions/invalidCustomerException';
import { Customer } from '@models/customer';
import { CustomerRepository } from '@ports/repository/customerRepository';
import { CustomerDto, customerSchema } from '@src/adapter/driver/schemas/customerSchema';
import { StatusCodes } from 'http-status-codes';

export class CustomerService {
	constructor(private readonly customerRepository: CustomerRepository) {}

	async getCustomers(): Promise<Customer[]> {
		const costumers = await this.customerRepository.getCustomers();
		return costumers;
	}

	async getCustomerByProperty(property: {
		id?: string;
		cpf?: string;
	}): Promise<Customer | null> {
		if ('id' in property) {
			return await this.customerRepository.getCustomerById(property.id!);
		} else if ('cpf' in property) {
			return await this.customerRepository.getCustomerByCpf(property.cpf!);
		} else {
			throw new InvalidCustomerException(
				'Provide a valid property to perform the search.'
			);
		}
	}

	async createCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
		customerDto = customerSchema.parse(customerDto);

		const existingCustomer = await this.customerRepository.getCustomerByCpf(customerDto.cpf);
		if (existingCustomer) {
			throw new InvalidCustomerException('A customer with this CPF already exists.');
		}

		return this.customerRepository.createCustomer(customerDto);
	}

	async deleteCustomer(id: string): Promise<void> {
		const existingCustomer = await this.customerRepository.getCustomerById(id);
		if (!existingCustomer) {
			throw new InvalidCustomerException(`Customer with ID ${id} not found.`, StatusCodes.NOT_FOUND);
		}

		return this.customerRepository.deleteCustomer(id);
	}
}
