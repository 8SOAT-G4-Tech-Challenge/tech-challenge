import { z } from 'zod';

export const productCategoryCreateUpdateSchema = z
	.object({
		name: z.string().min(3),
	})
	.required();

export const getProductCategoryByIdSchema = z
	.object({
		id: z.string().uuid(),
	})
	.required();
