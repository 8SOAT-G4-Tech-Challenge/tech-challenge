import { PaymentOrderStatusType } from '../types/paymentOrderStatusType';

export interface PaymentOrder {
	id: string;
	orderId: string;
	status: PaymentOrderStatusType;
	paidAt: Date | null;
	value: number;
	createdAt: Date;
	updatedAt: Date;
}
