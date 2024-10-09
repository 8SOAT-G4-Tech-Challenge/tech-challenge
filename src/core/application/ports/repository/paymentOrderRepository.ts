import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

import {
	CreatePaymentOrderParams,
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	UpdatePaymentOrderParams,
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
		makePaymentOrderParams: CreatePaymentOrderParams
	): Promise<PaymentOrder>;
	updatePaymentOrder(
		updatePaymentOrderParams: UpdatePaymentOrderParams
	): Promise<PaymentOrder>;
}
