import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { OrderService } from '@application/services';
import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { Order } from '@models/order';
import { GetOrderQueryParams } from '@ports/input/orders';

export class OrderController {
	private readonly orderService;

	constructor(orderService: OrderService) {
		this.orderService = orderService;
	}

	async getOrders(
		req: FastifyRequest<{ Querystring: GetOrderQueryParams }>,
		reply: FastifyReply
	) {
		try {
			logger.info('Listing orders');
			const orders: Order[] = await this.orderService.getOrders(req.query);
			reply.code(StatusCodes.OK).send(orders);
		} catch (error) {
			logger.error(`Unexpected error when trying to get orders: ${error}`);
			handleError(req, reply, error);
		}
	}
}
