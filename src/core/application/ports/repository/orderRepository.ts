import { OrderStatusType } from '@domain/types/orderStatusType';
import { Order } from '@models/order';

export interface OrderRepository {
	getOrders(): Promise<Order[]>;
	getOrdersByStatus(status: OrderStatusType): Promise<Order[]>;
}
