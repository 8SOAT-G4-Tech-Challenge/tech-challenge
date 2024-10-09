import logger from '@common/logger';
import { PaymentOrder } from '@domain/models/paymentOrder';
import { InvalidPaymentOrderException } from '@exceptions/invalidPaymentOrderException';
import { PaymentNotificationException } from '@exceptions/paymentNotificationException';
import { CreateQrResponse } from '@models/mercadoPagoQr';
import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
	UpdatePaymentOrderParams,
} from '@ports/input/paymentOrders';
import { PaymentOrderRepository } from '@ports/repository/paymentOrderRepository';

import { MercadoPagoService } from './mercadoPagoService';
import { OrderService } from './orderService';
import { NotificationPaymentDto } from '@driver/schemas/paymentOrderSchema';
import { PaymentNotificationStateEnum } from '@src/core/application/enumerations/paymentNotificationStateEnum';
import { PaymentOrderStatusEnum } from '@application/enumerations/paymentOrderEnum';
import { UpdateOrderParams } from '../ports/input/orders';
import { OrderStatusEnum } from '../enumerations/orderStatusEnum';

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

	async processPaymentNotification(
		notificationData: NotificationPaymentDto
	): Promise<void> {
		switch (notificationData.state) {
			case PaymentNotificationStateEnum.FINISHED:
				await this.finalizePayment(notificationData);
				break;
			case PaymentNotificationStateEnum.CONFIRMATION_REQUIRED:
				logger.info('Confirmation payment required');
				break;
			case PaymentNotificationStateEnum.CANCELED:
				await this.cancelPayment(notificationData);
				break;
			default:
				throw new PaymentNotificationException(
					`Invalid payment notification type ${notificationData.state}`
				);
		}
	}

	async finalizePayment(
		notificationData: NotificationPaymentDto
	): Promise<void> {
		logger.info(`Finished payment: ${JSON.stringify(notificationData)}`);
		logger.info(
			`Searching for payment order by id: ${notificationData.additional_info.external_reference}`
		);
		let paymentOrder =
			await this.paymentOrderRepository.getPaymentOrderByOrderId({
				orderId: notificationData.additional_info.external_reference,
			});
		if (paymentOrder) {
			logger.info(`Found payment order: ${JSON.stringify(paymentOrder)}`);
			const updatePaymentOrderParams: UpdatePaymentOrderParams = {
				id: paymentOrder.id,
				status: PaymentOrderStatusEnum.approved,
				paidAt: new Date(notificationData.created_at),
				value: notificationData.amount,
			};
			logger.info(
				`Updating payment order: ${JSON.stringify(updatePaymentOrderParams)}`
			);
			paymentOrder = await this.paymentOrderRepository.updatePaymentOrder(
				updatePaymentOrderParams
			);
			logger.info(
				`Payment order updated successfully: ${JSON.stringify(paymentOrder)}`
			);

			const updateOrder: UpdateOrderParams = {
				id: paymentOrder.orderId,
				status: OrderStatusEnum.received,
			};
			logger.info(`Updating order: ${JSON.stringify(updateOrder)}`);
			const order = await this.orderService.updateOrder(updateOrder);
			logger.info(`Order updated successfully: ${JSON.stringify(order)}`);
		} else {
			throw new PaymentNotificationException(
				`Error processing payment notification. Payment order ${notificationData.additional_info.external_reference} not found.`
			);
		}
	}

	async cancelPayment(notificationData: NotificationPaymentDto): Promise<void> {
		logger.info(`Cancelated payment: ${JSON.stringify(notificationData)}`);
		logger.info(
			`Searching for payment order by id: ${notificationData.additional_info.external_reference}`
		);
		let paymentOrder =
			await this.paymentOrderRepository.getPaymentOrderByOrderId({
				orderId: notificationData.additional_info.external_reference,
			});
		if (paymentOrder) {
			logger.info(`Found payment order: ${JSON.stringify(paymentOrder)}`);
			const updatePaymentOrderParams: UpdatePaymentOrderParams = {
				id: paymentOrder.id,
				status: PaymentOrderStatusEnum.cancelled,
			};
			logger.info(
				`Updating payment order: ${JSON.stringify(updatePaymentOrderParams)}`
			);
			paymentOrder = await this.paymentOrderRepository.updatePaymentOrder(
				updatePaymentOrderParams
			);
			logger.info(
				`Payment order updated successfully: ${JSON.stringify(paymentOrder)}`
			);

			const updateOrder: UpdateOrderParams = {
				id: paymentOrder.orderId,
				status: OrderStatusEnum.canceled,
			};
			logger.info(`Updating order: ${JSON.stringify(updateOrder)}`);
			const order = await this.orderService.updateOrder(updateOrder);
			logger.info(`Order updated successfully: ${JSON.stringify(order)}`);
		} else {
			throw new PaymentNotificationException(
				`Error processing payment notification. Payment order ${notificationData.additional_info.external_reference} not found.`
			);
		}
	}
}
