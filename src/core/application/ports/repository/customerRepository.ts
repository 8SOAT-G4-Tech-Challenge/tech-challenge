import { Customer } from '@models/customer';
import { CustomerDto } from '@src/adapter/driver/schemas/customerSchema';

export interface CustomerRepository {
	getCustomers(): Promise<Customer[]>;
	getCustomerById(id: string): Promise<Customer | null>;
	getCustomerByCpf(cpf: string): Promise<Customer | null>;
	createCustomer(customer: CustomerDto): Promise<Customer>;
	deleteCustomer(id: string): Promise<void>;
}
