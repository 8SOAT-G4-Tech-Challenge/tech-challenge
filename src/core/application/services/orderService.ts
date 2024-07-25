import logger from '@common/logger';
import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';
import { InvalidOrderStatusException } from '@driver/exceptions/invalidOrderStatusException';
import { Order } from '@models/order';
import { GetOrderQueryParams } from '@ports/input/orders';
import { OrderRepository } from '@ports/repository/orderRepository';

export class OrderService {
	constructor(private readonly orderRepository: OrderRepository) {}

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
}
