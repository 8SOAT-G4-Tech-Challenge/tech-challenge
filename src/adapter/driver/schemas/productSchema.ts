import { z } from 'zod';

const productFilterSchema = z.object({
	category: z.string().min(3).optional(),
});

export { productFilterSchema };

export const productSchema = z.object({
	name: z.string(),
	amount: z.number(),
	description: z.string(),
	categoryId: z.string().uuid(),
});

export const updateProductSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	amount: z.number(),
	description: z.string().optional(),
	categoryId: z.string().uuid(),
});
