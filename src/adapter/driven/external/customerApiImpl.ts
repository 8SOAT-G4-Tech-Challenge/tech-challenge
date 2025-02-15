import axios, { AxiosInstance } from 'axios';

import { GetCustomerByPropertyParams } from '@src/core/application/ports/input/customer';
import { Customer } from '@src/core/domain/models/customer';

import { CustomerApi } from '../../../core/application/ports/repository/customerApiRepository';

export class CustomerApiImpl implements CustomerApi {
	private readonly axiosInstance: AxiosInstance;

	constructor(private readonly baseUrl: string) {
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async getCustomers(): Promise<Customer[]> {
		try {
			const response = await this.axiosInstance.get(
				`${this.baseUrl}/admin/customers`
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(
					`Error while trying to get all customers: ${JSON.stringify(
						error.response
					)}`
				);
			}
			throw new Error('Unexpected error while trying to get all customers');
		}
	}

	async getCustomerByProperty({
		id,
	}: GetCustomerByPropertyParams): Promise<Customer> {
		try {
			const response = await this.axiosInstance.get(
				`${this.baseUrl}/totem/customers/property?id=${id}`
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(
					`Error while trying to get customer by property: ${JSON.stringify(
						error.response
					)}`
				);
			}
			throw new Error(
				'Unexpected error while trying to get customer by property'
			);
		}
	}
}
