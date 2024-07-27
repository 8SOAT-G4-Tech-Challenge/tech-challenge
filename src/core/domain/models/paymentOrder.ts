import { PaymentOrderStatusType } from '../types/paymentOrderType';

export interface PaymentOrder {
	id: string;
	orderId: string;
	status: PaymentOrderStatusType;
	paidAt: Date | null;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
}
