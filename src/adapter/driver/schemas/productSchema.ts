import { z } from 'zod';

const productFilterSchema = z.object({
	category: z.string().min(3).optional(),
});

export { productFilterSchema };

export const productSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
	amount: z.number(),
	description: z.string().nullable(),
	categoryId: z.string(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type ProductDto = z.infer<typeof productSchema>;
