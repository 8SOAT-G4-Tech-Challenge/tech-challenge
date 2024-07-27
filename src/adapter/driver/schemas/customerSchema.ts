import { z } from 'zod';

export const customerSchema = z.object({
	name: z.string().nullable().optional(),
	email: z.string().email().nullable().optional(),
	cpf: z.string()
		.min(1, { message: 'CPF is required' })
		.length(11, { message: 'CPF must be exactly 11 characters long' }),
}).refine((data) => data.name || data.email, {
	message: 'At least one of the fields "name" or "email" must be provided.',
	path: ['name', 'email'],
});

export type CustomerDto = z.infer<typeof customerSchema>
