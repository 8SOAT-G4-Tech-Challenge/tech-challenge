import { prisma } from '@driven/infra/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { PaymentOrderRepository } from '@src/core/application/ports/repository/paymentOrderRepository';
import { PaymentOrderStatusEnum } from '@src/core/domain/enums/paymentOrderEnum';
import { PaymentOrder } from '@src/core/domain/models/paymentOrder';

export class PaymentOrderRepositoryImpl implements PaymentOrderRepository {
	async getPaymentOrders(): Promise<PaymentOrder[]> {
		const paymentOrders = await prisma.paymentOrder.findMany({
			select: {
				id: true,
				orderId: true,
				status: true,
				amount: true,
				paidAt: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return paymentOrders;
	}

	async getPaymentOrderById(id: string): Promise<PaymentOrder | null> {
		const paymentOrder = await prisma.paymentOrder.findUnique({
			where: { id },
			select: {
				id: true,
				orderId: true,
				amount: true,
				paidAt: true,
				status: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return paymentOrder;
	}

	async createPaymentOrder(orderId: string, amount: number): Promise<PaymentOrder> {
		const createdPaymentOrder = await prisma.paymentOrder.create({
			data: {
				orderId: orderId,
				status: PaymentOrderStatusEnum.approved,
				amount: new Decimal(amount),
				paidAt: new Date(),
			}
		});

		return createdPaymentOrder;
	}
}
