import { z } from 'zod';

const productFilterSchema = z.object({
    category: z.string().min(3)
});


export {
    productFilterSchema
}