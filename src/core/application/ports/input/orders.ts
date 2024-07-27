import { OrderStatusType } from '@domain/types/orderStatusType';

export type GetOrderQueryParams = {
	status?: OrderStatusType;
};

export type GetOrderByIdParams = {
	id?: string;
};

export type CreateOrderParams = {
	customerId?: string;
};

export type UpdateOrderParams = {
	id?: string;
	status?: OrderStatusType;
};
