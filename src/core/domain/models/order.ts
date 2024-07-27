import { OrderStatusType } from '@domain/types/orderStatusType';

export interface Order {
	id: string;
	customerId: string | null;
	status: OrderStatusType;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
}
