import { Decimal } from "@prisma/client/runtime/library";
import { PaymentOrderStatusType } from "../types/paymentOrderType";

export interface PaymentOrder {
	id: string;
	orderId: string;
    status: PaymentOrderStatusType;
	paidAt: Date | null;
    amount: Decimal;
	createdAt: Date;
	updatedAt: Date;
}
