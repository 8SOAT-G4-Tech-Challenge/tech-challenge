import { z } from 'zod';

export const addItemToCartSchema = z.object({
	orderId: z.string(),
	productId: z.string(),
	quantity: z.number(),
	description: z.string().optional(),
});

export const updateCartItemSchema = z.object({
	id: z.string(),
	quantity: z.number(),
	description: z.string().optional(),
});
