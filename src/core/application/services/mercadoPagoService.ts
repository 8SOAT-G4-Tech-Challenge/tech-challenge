import axios from 'axios';

import { EnvironmentService } from '@common/environmentService';
import logger from '@common/logger';
import { InvalidMercadoPagoException } from '@exceptions/invalidMercadoPagoException';
import {
	CreateQrRequest,
	CreateQrRequestItem,
	CreateQrResponse,
} from '@models/mercadoPagoQr';
import { OrderItem } from '@models/orderItem';
import { CartRepository } from '@ports/repository/cartRepository';
import { ProductRepository } from '@ports/repository/productRepository';
import {
	convertKeysToSnakeCase,
	convertKeysToCamelCase,
} from '@src/utils/caseConverterUtil';

export class MercadoPagoService {
	private readonly baseUrl: string = 'https://api.mercadopago.com';

	private readonly cartRepository: CartRepository;

	private readonly posId: string;

	private readonly productRepository: ProductRepository;

	private readonly token: string;

	private readonly userId: number;

	constructor(
		cartRepository: CartRepository,
		productRepository: ProductRepository,
		environmentService: EnvironmentService
	) {
		this.cartRepository = cartRepository;
		this.productRepository = productRepository;

		this.token = environmentService.getMercadoPagoToken();
		this.userId = environmentService.getMercadoPagoUserId();
		this.posId = environmentService.getMercadoPagoExternalPosId();
	}

	async createQrPaymentRequest(
		orderId: string,
		value: number
	): Promise<CreateQrResponse> {
		logger.info('Creating QR Payment Request...');

		const orderItems = await this.cartRepository.getAllCartItemsByOrderId(
			orderId
		);

		const createQrRequestItems: CreateQrRequestItem[] = await Promise.all(
			orderItems.map(async (orderItem: OrderItem) => {
				const product = await this.productRepository.getProductById(
					orderItem.productId
				);

				return {
					title: orderItem.productId,
					quantity: orderItem.quantity,
					unitMeasure: 'unit',
					totalAmount: orderItem.value,
					unitPrice: product.value,
				};
			})
		);

		const createQrRequest: CreateQrRequest = {
			externalReference: orderId,
			title: `Purchase ${orderId}`,
			description: '',
			totalAmount: value,
			expirationDate: new Date(Date.now() + 3600000).toISOString(),
			items: createQrRequestItems,
		};

		logger.info(
			`CreateQrRequest object to send to Mercado Pago: ${JSON.stringify(
				createQrRequest,
				null,
				2
			)}`
		);

		return this.createQrCodePayment(createQrRequest);
	}

	async createQrCodePayment(
		request: CreateQrRequest
	): Promise<CreateQrResponse> {
		try {
			const formattedRequest: CreateQrRequest = convertKeysToSnakeCase(request);

			logger.info(
				`Making request to: ${this.baseUrl}/instore/orders/qr/seller/collectors/${this.userId}/pos/${this.posId}/qrs to collect qrData`
			);

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

			const formattedResponse: CreateQrResponse = await convertKeysToCamelCase(
				response.data
			);

			logger.info(
				`Object successfully returned by Mercado Pago was: ${JSON.stringify(
					formattedResponse,
					null,
					2
				)}`
			);

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

			logger.info(
				`Error on createQrCodePayment: ${JSON.stringify(error, null, 2)}`
			);

			throw new InvalidMercadoPagoException('Unexpected error occurred', 500);
		}
	}
}
