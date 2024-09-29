import logger from '@common/logger';
import { PaymentOrder } from '@domain/models/paymentOrder';
import { InvalidPaymentOrderException } from '@exceptions/invalidPaymentOrderException';
import { CreateQrResponse } from '@models/mercadoPagoQr';
import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '@ports/input/paymentOrders';
import { PaymentOrderRepository } from '@ports/repository/paymentOrderRepository';

import { MercadoPagoService } from './mercadoPagoService';
import { OrderService } from './orderService';

export class PaymentOrderService {
	private readonly paymentOrderRepository;

	private readonly orderService: OrderService;

	private readonly mercadoPagoService: MercadoPagoService;

	constructor(
		paymentOrderRepository: PaymentOrderRepository,
		orderService: OrderService,
		mercadoPagoService: MercadoPagoService
	) {
		this.paymentOrderRepository = paymentOrderRepository;
		this.orderService = orderService;
		this.mercadoPagoService = mercadoPagoService;
	}

	async getPaymentOrders(): Promise<PaymentOrder[]> {
		const paymentOrders: PaymentOrder[] =
			await this.paymentOrderRepository.getPaymentOrders();

		return paymentOrders;
	}

	async getPaymentOrderById(
		getPaymentOrderByIdParams: GetPaymentOrderByIdParams
	): Promise<PaymentOrder | null> {
		const paymentOrder: PaymentOrder | null =
			await this.paymentOrderRepository.getPaymentOrderById(
				getPaymentOrderByIdParams
			);

		return paymentOrder;
	}

	async getPaymentOrderByOrderId(
		getPaymentOrderByOrderIdParams: GetPaymentOrderByOrderIdParams
	): Promise<PaymentOrder | null> {
		const paymentOrder: PaymentOrder | null =
			await this.paymentOrderRepository.getPaymentOrderByOrderId(
				getPaymentOrderByOrderIdParams
			);

		return paymentOrder;
	}

	async makePayment(
		makePaymentOrderParams: MakePaymentOrderParams
	): Promise<PaymentOrder> {
		const { orderId } = makePaymentOrderParams;

		const order = await this.orderService.getOrderCreatedById({
			id: orderId,
		});
		if (!order) {
			throw new InvalidPaymentOrderException(
				`Order with id: ${orderId} not found`
			);
		}

		const existingPaymentOrder =
			await this.paymentOrderRepository.getPaymentOrderByOrderId({ orderId });
		if (existingPaymentOrder) {
			throw new InvalidPaymentOrderException(
				`Payment Order for the Order ID: ${orderId} already exists`
			);
		}

		const value =
			(await this.orderService.getOrderTotalValueById(orderId)) ?? 0;

		const createQrResponse: CreateQrResponse =
			await this.mercadoPagoService.createQrPaymentRequest(orderId, value);

		logger.info('Creating Payment Order');
		const createdPaymentOrder =
			await this.paymentOrderRepository.createPaymentOrder({
				orderId,
				value,
				qrData: createQrResponse.qrData,
			});

		return createdPaymentOrder;
	}
}
