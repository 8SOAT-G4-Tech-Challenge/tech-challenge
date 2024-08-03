import logger from '@common/logger';
import { prisma } from '@driven/infra/lib/prisma';
import { DataNotFoundException } from '@exceptions/dataNotFound';
import { OrderItem } from '@models/orderItem';
import {
	AddItemToCartRepositoryProps,
	UpdateCartItemRepositoryProps,
} from '@ports/input/cart';
import { CartRepository } from '@ports/repository/cartRepository';

export class CartRepositoryImpl implements CartRepository {
	async addItemToCart(
		product: AddItemToCartRepositoryProps
	): Promise<OrderItem> {
		const orderItem = await prisma.orderItem.create({
			data: {
				orderId: product.orderId,
				quantity: product.quantity,
				productId: product.productId,
				value: product.value,
				details: product.details,
			},
		});

		logger.info(`Item added: ${JSON.stringify(orderItem)}`);

		return {
			...orderItem,
			value: parseFloat(orderItem.value.toString()),
		};
	}

	async updateCartItem(
		cartItem: UpdateCartItemRepositoryProps
	): Promise<OrderItem> {
		const updatedOrderItem = await prisma.orderItem
			.update({
				where: {
					id: cartItem.id,
				},
				data: {
					quantity: cartItem.quantity,
					value: cartItem.value,
					details: cartItem.details,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(
					`Order item with id: ${cartItem.id} not found`
				);
			});

		logger.info(`Order item updated: ${JSON.stringify(updatedOrderItem)}`);

		return {
			...updatedOrderItem,
			value: parseFloat(updatedOrderItem.value.toString()),
		};
	}

	async deleteCartItem(id: string): Promise<void> {
		await prisma.orderItem
			.delete({
				where: {
					id,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(`Order item with id: ${id} not found`);
			});

		logger.info(`Order item deleted: ${JSON.stringify(id)}`);
	}

	async getCartItemById(id: string): Promise<OrderItem> {
		const orderItem = await prisma.orderItem
			.findFirstOrThrow({
				where: {
					id,
				},
			})
			.catch(() => {
				throw new DataNotFoundException(`Order item with id: ${id} not found`);
			});

		logger.info(`Order item found: ${JSON.stringify(orderItem)}`);

		return {
			...orderItem,
			value: parseFloat(orderItem.value.toString()),
		};
	}
}
