import { Customer } from '@models/customer';
import { CustomerCreateUpdateParams } from '@src/core/domain/types/customer';

export interface CustomerRepository {
    getCustomers(): Promise<Customer[]>;
    getCustomerById(id: string): Promise<Customer | null>;
    getCustomerByCpf(cpf: string): Promise<Customer | null>;
    createCustomer(customer: CustomerCreateUpdateParams): Promise<Customer>;
}
