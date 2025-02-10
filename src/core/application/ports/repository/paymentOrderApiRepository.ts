import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
} from '@src/core/application/ports/input/paymentOrders';
import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

export interface PaymentOrderApi {
	getPaymentOrders(): Promise<PaymentOrder[]>;
	getPaymentOrderById(
		getPaymentOrderByIdParams: GetPaymentOrderByIdParams
	): Promise<PaymentOrder | null>;
	getPaymentOrderByOrderId(
		getPaymentOrderByOrderIdParams: GetPaymentOrderByOrderIdParams
	): Promise<PaymentOrder | null>;
}
