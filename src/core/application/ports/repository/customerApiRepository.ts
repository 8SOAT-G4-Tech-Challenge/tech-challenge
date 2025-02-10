import { GetCustomerByPropertyParams } from '@src/core/application/ports/input/customer';
import { Customer } from '@src/core/domain/models/customer';

export interface CustomerApi {
	getCustomers(): Promise<Customer[]>;
	getCustomerByProperty({
		id,
	}: GetCustomerByPropertyParams): Promise<Customer | null>;
}
