import { z } from 'zod';

import { OrderStatusEnum } from '@application/enumerations/orderStatusEnum';

export const getOrderByIdSchema = z
	.object({
		id: z.string(),
	})
	.required();

export const updateOrderSchema = z
	.object({
		id: z.string(),
		status: z.nativeEnum(OrderStatusEnum),
	})
	.required();
