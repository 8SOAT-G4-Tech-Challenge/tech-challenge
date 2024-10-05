export const PaymentOrderStatusEnum = {
	pending: 'pending',
	approved: 'approved',
	authorized: 'authorized',
	in_process: 'in_process',
	in_mediation: 'in_mediation',
	rejected: 'rejected',
	cancelled: 'cancelled',
	refunded: 'refunded',
	charged_back: 'charged_back',
} as const;
