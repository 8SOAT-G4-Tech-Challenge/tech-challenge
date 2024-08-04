import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';
import { PaymentOrder } from '@domain/models/paymentOrder';
import { InvalidPaymentOrderException } from '@exceptions/invalidPaymentOrderException';
import { UpdateOrderParams } from '@ports/input/orders';
import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '@ports/input/paymentOrders';
import { OrderRepository } from '@ports/repository/orderRepository';
import { PaymentOrderRepository } from '@ports/repository/paymentOrderRepository';

export class PaymentOrderService {
	private readonly paymentOrderRepository;

	private readonly orderRepository: OrderRepository;

	constructor(
		paymentOrderRepository: PaymentOrderRepository,
		orderRepository: OrderRepository
	) {
		this.paymentOrderRepository = paymentOrderRepository;
		this.orderRepository = orderRepository;
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
		const order = await this.orderRepository.getOrderById({
			id: makePaymentOrderParams.orderId,
		});

		if (!order) {
			throw new InvalidPaymentOrderException(
				`Order with id: ${makePaymentOrderParams.orderId} not found`
			);
		}

		const existingPaymentOrder =
			await this.paymentOrderRepository.getPaymentOrderByOrderId(
				makePaymentOrderParams
			);

		if (existingPaymentOrder) {
			throw new InvalidPaymentOrderException(
				`Payment Order for the Order ID: ${makePaymentOrderParams.orderId} already exists`
			);
		}

		await this.paymentOrderRepository.createPaymentOrder(
			makePaymentOrderParams
		);

		// Método para pegar amount: passar orderId e calcular o valor total do pedido

		const updateOrderParams: UpdateOrderParams = {
			id: order.id,
			status: OrderStatusEnum.received,
		};

		await this.orderRepository.updateOrder(updateOrderParams);
	}
}
