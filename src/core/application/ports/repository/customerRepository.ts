import { Customer } from '@models/customer';
import { CustomerDto } from '@src/adapter/driver/schemas/customerSchema';

import { DeleteCustomerParams } from '../input/customers';

export interface CustomerRepository {
	getCustomers(): Promise<Customer[]>;
	getCustomerById(id: string): Promise<Customer | null>;
	getCustomerByCpf(cpf: string): Promise<Customer | null>;
	createCustomer(customer: CustomerDto): Promise<CustomerDto>;
	deleteCustomer(deleteCustomerParams: DeleteCustomerParams): Promise<void>;
}
