import { z } from 'zod';

const productCategoryCreateSchema = z.object({
    name: z.string().min(3)
});

const productCategoryFilters = z.object({
    id: z.string().min(3)
});

export {
    productCategoryFilters,
    productCategoryCreateSchema
}