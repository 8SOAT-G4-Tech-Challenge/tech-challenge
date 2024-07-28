import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '../input/paymentOrders';

export interface PaymentOrderRepository {
	getPaymentOrders(): Promise<PaymentOrder[]>;
	getPaymentOrderById(
		getPaymentOrderByIdParams: GetPaymentOrderByIdParams
	): Promise<PaymentOrder | null>;
	getPaymentOrderByOrderId(
		getPaymentOrderByOrderIdParams: GetPaymentOrderByOrderIdParams
	): Promise<PaymentOrder | null>;
	createPaymentOrder(
		makePaymentOrderParams: MakePaymentOrderParams
	): Promise<PaymentOrder>;
}
