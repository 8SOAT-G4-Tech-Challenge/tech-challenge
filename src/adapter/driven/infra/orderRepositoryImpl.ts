import { OrderStatusType } from '@domain/types/orderStatusType';
import { prisma } from '@driven/infra/lib/prisma';
import { Order } from '@models/order';
import { OrderRepository } from '@ports/repository/orderRepository';
import logger from '@src/core/common/logger';

export class OrderRepositoryImpl implements OrderRepository {
	async getOrders(): Promise<Order[]> {
		const orders = await prisma.order.findMany({
			include: {
				items: {
					include: {
						product: {
							include: {
								category: true,
								images: true,
							},
						},
					},
				},
				customer: true,
				payment: true,
			},
		});

		const ordersParsed = orders.map((order) => ({
			...order,
			amount: parseFloat(order.amount.toString()),
		}));
		logger.info(`Orders found: ${JSON.stringify(ordersParsed)}`);

		return ordersParsed;
	}

	async getOrdersByStatus(status: OrderStatusType): Promise<Order[]> {
		const orders = await prisma.order.findMany({
			where: {
				status,
			},
			include: {
				items: {
					include: {
						product: {
							include: {
								category: true,
								images: true,
							},
						},
					},
				},
				customer: true,
				payment: true,
			},
		});

		const ordersParsed = orders.map((order) => ({
			...order,
			amount: parseFloat(order.amount.toString()),
		}));
		logger.info(`Orders found: ${JSON.stringify(ordersParsed)}`);

		return ordersParsed;
	}
}
