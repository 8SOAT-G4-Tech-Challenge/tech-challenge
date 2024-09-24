import axios from 'axios';

import { InvalidMercadoPagoException } from '@exceptions/invalidMercadoPagoException';
import { CreateQrRequest, CreateQrResponse } from '@models/mercadoPagoQr';
import { MercadoPagoRepository } from '@ports/repository/mercadoPagoRepository';
import {
	convertKeysToCamelCase,
	convertKeysToSnakeCase,
} from '@src/utils/case-converter';

export class MercadoPagoRepositoryImpl implements MercadoPagoRepository {
	private readonly baseUrl: string = 'https://api.mercadopago.com';

	private readonly token: string;

	private readonly posId: string;

	private readonly userId: number;

	constructor(token: string, userId: number, posId: string) {
		this.token = token;
		this.userId = userId;
		this.posId = posId;
	}

	async createQrPayment(request: CreateQrRequest): Promise<CreateQrResponse> {
		try {
			const formattedRequest = convertKeysToSnakeCase(request);

			const response = await axios.post<CreateQrResponse>(
				`${this.baseUrl}/instore/orders/qr/seller/collectors/${this.userId}/pos/${this.posId}/qrs`,
				formattedRequest,
				{
					headers: {
						Authorization: `Bearer ${this.token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			const formattedResponse = convertKeysToCamelCase(response.data);
			return formattedResponse;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				const { data, status } = error.response;

				const errorMessage = data.message || 'Unknown error occurred';
				const errorStatus = status || 500;
				const errorDetails = data.error || 'Error details not provided';

				throw new InvalidMercadoPagoException(
					`Error: ${errorDetails}, Message: ${errorMessage}`,
					errorStatus
				);
			}

			throw new InvalidMercadoPagoException('Unexpected error occurred', 500);
		}
	}
}
