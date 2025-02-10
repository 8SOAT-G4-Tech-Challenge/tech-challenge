import axios, { AxiosInstance } from 'axios';

import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
} from '@src/core/application/ports/input/paymentOrders';
import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

import { PaymentOrderApi } from '../../../core/application/ports/repository/paymentOrderApiRepository';

export class PaymentOrderApiImpl implements PaymentOrderApi {
	private readonly axiosInstance: AxiosInstance;

	constructor(private readonly baseUrl: string) {
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async getPaymentOrders(): Promise<PaymentOrder[]> {
		try {
			const paymentOrders: PaymentOrder[] = await this.axiosInstance.get(
				`${this.baseUrl}/admin/payment-orders`
			);

			return paymentOrders;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(
					`Error while trying to get all payment orders: ${JSON.stringify(
						error.response
					)}`
				);
			}
			throw new Error(
				'Unexpected error while trying to get all payment orders'
			);
		}
	}

	async getPaymentOrderById({
		id,
	}: GetPaymentOrderByIdParams): Promise<PaymentOrder | null> {
		try {
			const paymentOrder: PaymentOrder | null = await this.axiosInstance.get(
				`${this.baseUrl}/totem/payment-orders/${id}`
			);

			return paymentOrder;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(
					`Error while trying to get payment order by ID: ${JSON.stringify(
						error.response
					)}`
				);
			}
			throw new Error(
				'Unexpected error while trying to get payment order by ID'
			);
		}
	}

	async getPaymentOrderByOrderId({
		orderId,
	}: GetPaymentOrderByOrderIdParams): Promise<PaymentOrder | null> {
		try {
			const paymentOrder: PaymentOrder | null = await this.axiosInstance.get(
				`${this.baseUrl}/totem/payment-orders/orders/${orderId}`
			);

			return paymentOrder;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw new Error(
					`Error while trying to get payment order by order ID: ${JSON.stringify(
						error.response
					)}`
				);
			}
			throw new Error(
				'Unexpected error while trying to get payment order by order ID'
			);
		}
	}
}
