import { EnvironmentService } from '@common/environmentService';
import logger from '@common/logger';
import {
	CreateQrResponse,
	CreateQrRequest,
	CreateQrRequestItem,
} from '@models/mercadoPagoQr';
import { OrderItem } from '@models/orderItem';
import { CartRepository } from '@ports/repository/cartRepository';
import { MercadoPagoRepository } from '@ports/repository/mercadoPagoRepository';
import { ProductRepository } from '@ports/repository/productRepository';
import { MercadoPagoRepositoryImpl } from '@src/adapter/driven/infra/mercadoPagoRepositoryImpl';

export class MercadoPagoService {
	private readonly mercadoPagoRepository: MercadoPagoRepository;

	private readonly cartRepository: CartRepository;

	private readonly productRepository: ProductRepository;

	constructor(
		cartRepository: CartRepository,
		productRepository: ProductRepository,
		environmentService: EnvironmentService
	) {
		this.cartRepository = cartRepository;
		this.productRepository = productRepository;

		const token = environmentService.getMercadoPagoToken();
		const userId = environmentService.getMercadoPagoUserId();
		const posId = environmentService.getMercadoPagoExternalPosId();

		this.mercadoPagoRepository = new MercadoPagoRepositoryImpl(
			token,
			userId,
			posId
		);
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

		return this.mercadoPagoRepository.createQrPayment(createQrRequest);
	}
}
