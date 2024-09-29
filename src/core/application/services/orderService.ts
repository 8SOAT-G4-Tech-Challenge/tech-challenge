import logger from '@common/logger';
import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';
import { getOrderByIdSchema, updateOrderSchema } from '@driver/schemas/orders';
import { InvalidOrderException } from '@exceptions/invalidOrderException';
import { InvalidOrderStatusException } from '@exceptions/invalidOrderStatusException';
import { Order } from '@models/order';
import {
	GetOrderQueryParams,
	CreateOrderParams,
	GetOrderByIdParams,
	UpdateOrderParams,
} from '@ports/input/orders';
import { CreateOrderResponse } from '@ports/output/orders';
import { CartRepository } from '@ports/repository/cartRepository';
import { OrderRepository } from '@ports/repository/orderRepository';

export class OrderService {
	private readonly orderRepository: OrderRepository;

	private readonly cartRepository: CartRepository;

	constructor(
		orderRepository: OrderRepository,
		cartRepository: CartRepository
	) {
		this.orderRepository = orderRepository;
		this.cartRepository = cartRepository;
	}

	async getOrders({ status }: GetOrderQueryParams): Promise<Order[]> {
		if (status && Object.values(OrderStatusEnum).includes(status)) {
			logger.info(`Searching orders by status: ${status}`);
			const orders = await this.orderRepository.getOrdersByStatus(status);
			return orders;
		}

		if (status && !Object.values(OrderStatusEnum).includes(status)) {
			throw new InvalidOrderStatusException(
				`Error listing orders by status. Invalid status: ${status}`
			);
		}

		logger.info('Searching all orders');
		const orders = await this.orderRepository.getOrders();
		return orders;
	}

	async getOrderById({ id }: GetOrderByIdParams): Promise<Order> {
		const { success } = getOrderByIdSchema.safeParse({ id });

		if (!success) {
			throw new InvalidOrderException(
				`Error listing order by Id. Invalid Id: ${id}`
			);
		}

		logger.info(`Searching order by Id: ${id}`);
		const orderFound = await this.orderRepository.getOrderById({ id });

		return orderFound;
	}

	async getOrderCreatedById({ id }: GetOrderByIdParams): Promise<Order> {
		const { success } = getOrderByIdSchema.safeParse({ id });

		if (!success) {
			throw new InvalidOrderException(
				`Error listing order by Id. Invalid Id: ${id}`
			);
		}

		logger.info(`Searching order created by Id: ${id}`);
		const orderFound = await this.orderRepository.getOrderCreatedById({ id });

		return orderFound;
	}

	async createOrder(order: CreateOrderParams): Promise<CreateOrderResponse> {
		if (order?.customerId) {
			logger.info(`Creating order with customer: ${order?.customerId}`);
		} else {
			logger.info('Creating order..');
		}

		return this.orderRepository.createOrder(order);
	}

	async updateOrder(order: UpdateOrderParams): Promise<CreateOrderResponse> {
		const { success } = updateOrderSchema.safeParse(order);

		if (!success && !order?.id) {
			throw new InvalidOrderException(
				"Can't update order without providing an ID"
			);
		}

		if (!success) {
			throw new InvalidOrderException(
				"Can't update order without providing a valid status"
			);
		}

		logger.info(`Updating order: ${order.id}`);
		return this.orderRepository.updateOrder(order);
	}

	async getOrderTotalValueById(id: string): Promise<number> {
		if (!id) {
			throw new InvalidOrderException(
				"Can't return order total value without providing a valid ID"
			);
		}

		const productItems = await this.cartRepository.getAllCartItemsByOrderId(id);

		if (!productItems.length) {
			throw new InvalidOrderException(
				"Can't return order total value without order items"
			);
		}

		const totalValue = productItems.reduce(
			(acc, productItem) => acc + productItem.value,
			0
		);

		logger.info(`Total value from order ${id} is ${totalValue}`);
		return totalValue;
	}
}
