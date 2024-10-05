import { z } from 'zod';

export const paymentOrderSchema = z
	.object({
		id: z.string(),
		orderId: z.string(),
		status: z.enum([
			'pending',
			'approved',
			'authorized',
			'in_process',
			'in_mediation',
			'rejected',
			'cancelled',
			'refunded',
			'charged_back',
		]),
		paidAt: z.date().nullable().optional(),
		amount: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.required();

export const paymentNotificationPaymentSchema = z
	.object({
		amount: z.number(),
		caller_id: z.number(),
		client_id: z.number(),
		created_at: z.string(),
		id: z.string(),
		state: z.string(),
		additional_info: z.object({
			external_reference: z.string(),
		}),
	})
	.required();

export type PaymentOrderDto = z.infer<typeof paymentOrderSchema>;
