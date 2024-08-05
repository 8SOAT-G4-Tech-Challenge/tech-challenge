import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';
import { PaymentOrder } from '@domain/models/paymentOrder';
import { InvalidPaymentOrderException } from '@exceptions/invalidPaymentOrderException';
import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '@ports/input/paymentOrders';
import { OrderRepository } from '@ports/repository/orderRepository';
import { PaymentOrderRepository } from '@ports/repository/paymentOrderRepository';

import { OrderService } from './orderService';

export class PaymentOrderService {
	private readonly paymentOrderRepository;

	private readonly orderRepository: OrderRepository;

	private readonly orderService: OrderService;

	constructor(
		paymentOrderRepository: PaymentOrderRepository,
		orderRepository: OrderRepository,
		orderService: OrderService
	) {
		this.paymentOrderRepository = paymentOrderRepository;
		this.orderRepository = orderRepository;
		this.orderService = orderService;
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
	): Promise<void> {
		const { orderId } = makePaymentOrderParams;

		const order = await this.orderRepository.getOrderCreatedById({
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
		await this.paymentOrderRepository.createPaymentOrder({ orderId, value });

		await this.orderRepository.updateOrder({
			id: order.id,
			status: OrderStatusEnum.received,
		});
	}
}
