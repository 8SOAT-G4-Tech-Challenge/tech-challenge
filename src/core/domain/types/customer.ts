import { Customer } from '@models/customer';

export type CustomerCreateUpdateParams = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>
