import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { Order } from '@models/order';
import { OrderItem } from '@models/orderItem';
import {
	AddItemToCartBody,
	UpdateCartItemBody,
	UpdateCartItemParams,
} from '@ports/input/cart';
import { CartService } from '@services/cartService';

export class CartController {
	private readonly cartService: CartService;

	constructor(cartService: CartService) {
		this.cartService = cartService;
	}

	async addItemToCart(
		req: FastifyRequest<{ Params: Pick<Order, 'id'>; Body: AddItemToCartBody }>,
		reply: FastifyReply
	) {
		try {
			logger.info(`Adding item to order: ${req?.params?.id}`);
			const orderItem: OrderItem = await this.cartService.addItemToCart({
				...req.body,
				orderId: req?.params?.id,
			});
			reply.code(StatusCodes.CREATED).send(orderItem);
		} catch (error) {
			logger.error(
				`Unexpected error when trying to add product to cart: ${error}`
			);
			handleError(req, reply, error);
		}
	}

	async updateCartItem(
		req: FastifyRequest<{
			Params: UpdateCartItemParams;
			Body: UpdateCartItemBody;
		}>,
		reply: FastifyReply
	) {
		try {
			logger.info(`Updating cart item ${req?.params?.id}`);
			const orderItem: OrderItem = await this.cartService.updateCartItem({
				...req.body,
				id: req?.params?.id,
			});
			reply.code(StatusCodes.OK).send(orderItem);
		} catch (error) {
			logger.error(`Unexpected error when trying to update cart: ${error}`);
			handleError(req, reply, error);
		}
	}

	async deleteCartItem(
		req: FastifyRequest<{
			Params: { id: string };
		}>,
		reply: FastifyReply
	) {
		try {
			logger.info(`Updating cart item ${req?.params?.id}`);

			reply
				.code(StatusCodes.OK)
				.send(await this.cartService.deleteCartItem(req?.params?.id));
		} catch (error) {
			logger.error(`Unexpected error when trying to delete cart: ${error}`);
			handleError(req, reply, error);
		}
	}
}
