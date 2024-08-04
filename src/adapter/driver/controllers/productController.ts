import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';
import { UpdateProductResponse } from '@ports/output/products';
import { Product } from '@prisma/client';
import { ProductService } from '@services/productService';

export class ProductController {
	private readonly productService;

	constructor(productService: ProductService) {
		this.productService = productService;
	}

	async getProducts(req: FastifyRequest, reply: FastifyReply) {
		try {
			if (req.query && Object.keys(req.query).length > 0) {
				logger.info(
					`Listing products with parameters: ${JSON.stringify(req.query)}`
				);
			} else {
				logger.info('Listing products');
			}
			reply
				.code(StatusCodes.OK)
				.send(await this.productService.getProducts(req.query));
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for products';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async deleteProducts(
		req: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		const { id } = req.params as { id: string };
		try {
			logger.info('Deleting product');
			await this.productService.deleteProducts(id);
			reply
				.code(StatusCodes.OK)
				.send({ message: 'Product successfully deleted' });
		} catch (error) {
			const errorMessage = 'Unexpected when deleting for product';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async createProducts(
		req: FastifyRequest<{ Body: CreateProductParams }>,
		reply: FastifyReply
	) {
		try {
			logger.info(`Creating product: ${JSON.stringify(req.body)}`);
			reply
				.code(StatusCodes.CREATED)
				.send(await this.productService.createProducts(req.body));
		} catch (error) {
			const errorMessage = 'Unexpected when creating for product';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async updateProducts(
		req: FastifyRequest<{
			Params: Pick<Product, 'id'>;
			Body: UpdateProductParams;
		}>,
		reply: FastifyReply
	) {
		try {
			logger.info('Updating product', req?.params?.id);
			const product: UpdateProductResponse =
				await this.productService.updateProducts({
					...req.body,
					id: req?.params?.id,
				});
			reply.code(StatusCodes.OK).send(product);
		} catch (error) {
			logger.error(`Unexpected error when trying to update product: ${error}`);
			handleError(req, reply, error);
		}
	}
}
