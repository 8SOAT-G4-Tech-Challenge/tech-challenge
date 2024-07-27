import { z } from 'zod';

const productCategoryCreateSchema = z.object({
    name: z.string().min(3)
}).required();

export {
    productCategoryCreateSchema
}