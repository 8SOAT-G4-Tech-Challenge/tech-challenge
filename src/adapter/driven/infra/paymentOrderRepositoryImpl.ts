import {
	GetPaymentOrderByIdParams,
	GetPaymentOrderByOrderIdParams,
	MakePaymentOrderParams,
} from '@application/ports/input/paymentOrders';
import { PaymentOrderRepository } from '@application/ports/repository/paymentOrderRepository';
import { PaymentOrderStatusEnum } from '@domain/enums/paymentOrderEnum';
import { prisma } from '@driven/infra/lib/prisma';
import { PaymentOrder } from '@models/paymentOrder';
import { Decimal } from '@prisma/client/runtime/library';

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

		return paymentOrders.map((paymentOrder) => ({
			...paymentOrder,
			amount: parseFloat(paymentOrder.amount.toString()),
		}));
	}

	async getPaymentOrderById(
		getPaymentOrderByIdParams: GetPaymentOrderByIdParams
	): Promise<PaymentOrder | null> {
		const paymentOrder = await prisma.paymentOrder.findUnique({
			where: { id: getPaymentOrderByIdParams.id },
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

		if (paymentOrder) {
			return {
				...paymentOrder,
				amount: parseFloat(paymentOrder.amount.toString()),
			};
		}

		return paymentOrder;
	}

	async getPaymentOrderByOrderId(
		getPaymentOrderByOrderIdParams: GetPaymentOrderByOrderIdParams
	): Promise<PaymentOrder | null> {
		const { orderId } = getPaymentOrderByOrderIdParams;

		const paymentOrder = await prisma.paymentOrder.findUnique({
			where: { orderId },
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

		if (paymentOrder) {
			return {
				...paymentOrder,
				amount: parseFloat(paymentOrder.amount.toString()),
			};
		}

		return paymentOrder;
	}

	async createPaymentOrder(
		makePaymentOrderParams: MakePaymentOrderParams
	): Promise<PaymentOrder> {
		const createdPaymentOrder = await prisma.paymentOrder.create({
			data: {
				orderId: makePaymentOrderParams.orderId,
				status: PaymentOrderStatusEnum.approved,
				amount: new Decimal(makePaymentOrderParams.amount),
				paidAt: new Date(),
			},
		});

		return {
			...createdPaymentOrder,
			amount: parseFloat(createdPaymentOrder.amount.toString()),
		};
	}
}
