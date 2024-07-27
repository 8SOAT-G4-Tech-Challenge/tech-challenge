import { OrderStatusType } from '@domain/types/orderStatusType';

export interface Order {
	id: string;
	customerId: string | null;
	status: OrderStatusType;
	createdAt: Date;
	updatedAt: Date;
}
