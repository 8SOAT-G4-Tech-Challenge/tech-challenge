import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { ProductService } from '@services/productService';

export class ProductController {
	private readonly productService;

	constructor(productService: ProductService) {
		this.productService = productService;
	}

	async getProducts(req: FastifyRequest, reply: FastifyReply) {
		try {
			if (req.query && Object.keys(req.query).length > 0) {
				logger.info(`Listing products with parameters: ${JSON.stringify(req.query)}`);
			} else {
				logger.info('Listing products');
			}
			reply.code(StatusCodes.OK).send(await this.productService.getProducts(req.query));
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for products';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
