import { Customer } from "../customer";

export type CustomerCreateUpdateParams = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>