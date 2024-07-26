import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

export interface PaymentOrderRepository {
    getPaymentOrders(): Promise<PaymentOrder[]>;
    getPaymentOrderById(id: string): Promise<PaymentOrder | null>;
    createPaymentOrder(orderId: string, amount: number): Promise<PaymentOrder>;
}
