import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { handleError } from '@driver/errorHandler';
import { CustomerService } from '@services/customerService';
import {
	DeleteCustomerParams,
	GetCustomerByPropertyParams,
} from '@src/core/application/ports/input/customers';
import logger from '@src/core/common/logger';
import { Customer } from '@src/core/domain/models/customer';

import { CustomerDto } from '../schemas/customerSchema';

export class CustomerController {
	private readonly customerService: CustomerService;

	constructor(customerService: CustomerService) {
		this.customerService = customerService;
	}

	async getCustomers(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing customers');
			const customers: Customer[] = await this.customerService.getCustomers();
			reply.code(StatusCodes.OK).send(customers);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for customers';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async getCustomerByProperty(
		req: FastifyRequest<{ Body: GetCustomerByPropertyParams }>,
		reply: FastifyReply
	) {
		try {
			const { id, cpf } = req.query as { id?: string; cpf?: string };

			if (!(id || cpf)) {
				reply.code(StatusCodes.BAD_REQUEST).send({
					error: 'Bad Request',
					message:
						'Please provide either an ID or a CPF to search for a customer.',
				});
			}

			if (id && cpf) {
				reply.code(StatusCodes.BAD_REQUEST).send({
					error: 'Bad Request',
					message: 'Please provide either an ID or a CPF, not both.',
				});
			}

			const searchParam = id ? { id } : { cpf };
			logger.info(`Listing customers by ${id ? 'ID' : 'CPF'}`);
			const customer = await this.customerService.getCustomerByProperty(
				searchParam
			);

			if (customer) {
				reply.code(StatusCodes.OK).send(customer);
			} else {
				reply.code(StatusCodes.NOT_FOUND).send({
					error: 'Not Found',
					message: `Customer with ${id ? 'ID' : 'CPF'} ${id || cpf} not found`,
				});
			}
		} catch (error) {
			const errorMessage =
				'Unexpected error when listing for customer by property';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async createCustomer(
		req: FastifyRequest<{ Body: CustomerDto }>,
		reply: FastifyReply
	) {
		try {
			logger.info('Creating customer');
			const createdCustomer: CustomerDto =
				await this.customerService.createCustomer(req.body);
			reply.code(StatusCodes.CREATED).send(createdCustomer);
		} catch (error) {
			const errorMessage = 'Unexpected when creating for customer';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async deleteCustomer(
		req: FastifyRequest<{ Body: DeleteCustomerParams }>,
		reply: FastifyReply
	): Promise<void> {
		const { id } = req.params as { id: string };

		try {
			logger.info('Deleting customer');
			await this.customerService.deleteCustomer({ id });
			reply.code(200).send({ message: 'Customer successfully deleted' });
		} catch (error) {
			const errorMessage = 'Unexpected when deleting for customer';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
