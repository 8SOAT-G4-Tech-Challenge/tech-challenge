import { PaymentOrder } from "@src/core/domain/models/paymentOrder";
import { PaymentOrderRepository } from "../ports/repository/paymentOrderRepository";

export class PaymentOrderService {
	constructor(private readonly paymentOrderRepository: PaymentOrderRepository) {}

	async getPaymentOrders(): Promise<PaymentOrder[]> {
		const paymentOrders: PaymentOrder[] = await this.paymentOrderRepository.getPaymentOrders();
		return paymentOrders;
	}

    async getPaymentOrderById(id: string): Promise<PaymentOrder | null> {
        const paymentOrder: PaymentOrder | null = await this.paymentOrderRepository.getPaymentOrderById(id);
		return paymentOrder;
    }

    async makePayment(orderId: string, amount: number): Promise<void> {
        //Verificar se orderId é um pedido que existe no banco
        
        await this.paymentOrderRepository.createPaymentOrder(orderId, amount);
        //Atualizar Order para status = received
    }
}
