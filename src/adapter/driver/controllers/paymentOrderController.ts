import { PaymentOrder } from '@prisma/client';
import { PaymentOrderService } from '@src/core/application/services/paymentOrderService';
import { handleError } from '@src/core/common/errorHandler';
import logger from '@src/core/common/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export class PaymentOrderController {
	constructor(private readonly paymentOrderService: PaymentOrderService) { }
	
	async getPaymentOrders(req: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			logger.info('Listing payment orders');
			const paymentOrders: PaymentOrder[] = await this.paymentOrderService.getPaymentOrders();
			reply.code(StatusCodes.OK).send(paymentOrders);
		} catch (error) {
			const errorMessage = `Unexpected error when listing for payment orders`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	};

    async getPaymentOrderById(req: FastifyRequest, reply: FastifyReply): Promise<void> {

        const { id } = req.params as { id: string };

        try{
            logger.info('Listing payment order by ID');
            const paymentOrder: PaymentOrder | null = await this.paymentOrderService.getPaymentOrderById(id);
            paymentOrder 
                ? reply.code(StatusCodes.OK).send(paymentOrder)
                : reply.code(StatusCodes.NOT_FOUND).send({ error: 'Not Found', message: `Payment Order with ${id} not found` });
        } catch(error) {
            const errorMessage = `Unexpected error when listing for payment order`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    }

    async makePayment(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { orderId } = req.params as { orderId: string };
        const { amount } = req.body as { amount: number };

		try {
			logger.info('Making payment order');
            await this.paymentOrderService.makePayment(orderId, amount);
			reply.code(StatusCodes.OK).send({ message: 'Order payment successfully completed' });
		} catch (error) {
			const errorMessage = `Unexpected error when making payment order`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	}
}
