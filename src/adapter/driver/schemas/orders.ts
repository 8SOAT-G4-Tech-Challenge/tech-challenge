import { z } from 'zod';

import { OrderStatusEnum } from '@domain/enums/orderStatusEnum';

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
