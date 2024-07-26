import { Customer } from '@prisma/client';
import { CustomerService } from '@services/customerService';
import { handleError } from '@src/core/common/errorHandler';
import logger from '@src/core/common/logger';
import { CustomerCreateUpdateParams } from '@src/core/domain/types/customer';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export class CustomerController {
	constructor(private readonly customerService: CustomerService) { }

	async getCustomers(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing customers');
			const customers: Customer[] = await this.customerService.getCustomers();
			reply.code(StatusCodes.OK).send(customers);
		} catch (error) {
			const errorMessage = `Unexpected error when listing for customers`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	}

	async getCustomerByProperty(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { id, cpf } = req.query as { id?: string; cpf?: string };
	  
			if (!(id || cpf)) {
				return reply.code(StatusCodes.BAD_REQUEST).send({ error: 'Bad Request', message: 'Please provide either an ID or a CPF to search for a customer.' });
			}
		  
			if (id && cpf) {
				return reply.code(StatusCodes.BAD_REQUEST).send({ error: 'Bad Request', message: 'Please provide either an ID or a CPF, not both.' });
			}
	  
			const searchParam = id ? { id } : { cpf };
			logger.info(`Listing customers by ${id ? 'ID' : 'CPF'}`);
    		const customer = await this.customerService.getCustomerByProperty(searchParam);
	  
			customer 
				? reply.code(StatusCodes.OK).send(customer) 
				: reply.code(StatusCodes.NOT_FOUND).send({ error: 'Not Found', message: `Customer with ${id ? 'ID' : 'CPF'} ${id || cpf} not found` });
		} catch (error) {
			const errorMessage = `Unexpected error when listing for customer by property`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	};

	async createCustomer(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Creating customer');
			const { name, email, cpf }: CustomerCreateUpdateParams = req.body as CustomerCreateUpdateParams;
			const createdCustomer: CustomerCreateUpdateParams = await this.customerService.createCustomer({ name, email, cpf });
			reply.code(StatusCodes.CREATED).send(createdCustomer);
		} catch (error) {
			const errorMessage = `Unexpected when creating for customer`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	}
}