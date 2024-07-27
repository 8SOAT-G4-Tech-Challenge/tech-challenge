import { OrderStatusType } from '@domain/types/orderStatusType';
import { Order } from '@models/order';
import {
	CreateOrderParams,
	GetOrderByIdParams,
	UpdateOrderParams,
} from '@ports/input/orders';
import { CreateOrderResponse, UpdateOrderResponse } from '@ports/output/orders';

export interface OrderRepository {
	getOrders(): Promise<Order[]>;
	getOrderById(order: GetOrderByIdParams): Promise<Order>;
	getOrdersByStatus(status: OrderStatusType): Promise<Order[]>;
	createOrder(order: CreateOrderParams): Promise<CreateOrderResponse>;
	updateOrder(order: UpdateOrderParams): Promise<UpdateOrderResponse>;
}
