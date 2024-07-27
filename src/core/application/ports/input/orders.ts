import { OrderStatusType } from '@domain/types/orderStatusType';

export type GetOrderQueryParams = {
	status?: OrderStatusType;
};
