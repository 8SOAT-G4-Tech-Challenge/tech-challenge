import logger from '@common/logger';
import { PaymentOrder } from '@domain/models/paymentOrder';
import { InvalidPaymentOrderException } from '@exceptions/invalidPaymentOrderException';
import { NotificationPaymentException } from '@exceptions/notificationPaymentException';
import { CreateQrResponse } from '@models/mercadoPagoQr';
import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '@ports/input/paymentOrders';
import { PaymentOrderRepository } from '@ports/repository/paymentOrderRepository';

import { MercadoPagoService } from './mercadoPagoService';
import { OrderService } from './orderService';
import { paymentNotificationPaymentSchema } from '@driver/schemas/paymentOrderSchema';
import { NotificationPaymentStateEnum } from '@application/enumerations/notificationPaymentStateEnum';

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

	async processNotificationPayment(notificationData: any): Promise<void> {
		paymentNotificationPaymentSchema.parse(notificationData);

		switch (notificationData.state) {
			case NotificationPaymentStateEnum.FINISHED:
				logger.info('Finished payment');
				break;
			case NotificationPaymentStateEnum.CONFIRMATION_REQUIRED:
				logger.info('Confirmation payment required');
				break;
			case NotificationPaymentStateEnum.CANCELED:
				logger.info('Cancelated payment');
				break;
			default:
				throw new NotificationPaymentException(
					`Invalid notification payment type ${notificationData.state}`
				);
		}
	}
}
