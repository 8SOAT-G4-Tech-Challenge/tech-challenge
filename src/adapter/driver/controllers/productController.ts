import { ProductCategoryDto } from '@driver/schemas/productCategorySchema';
import { ProductService } from '@services/productService';
import { handleError } from '@src/core/common/errorHandler';
import logger from '@src/core/common/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    async getProducts(req: FastifyRequest, reply: FastifyReply) {
        try {
            logger.info('Listing products');
            reply.code(StatusCodes.OK).send(await this.productService.getProducts());
        } catch (error) {
            const errorMessage = `Unexpected error when listing for products`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    };

    async getProductCategories(req: FastifyRequest, reply: FastifyReply) {
        try {
            logger.info('Listing product categories');
            reply.code(StatusCodes.OK).send(await this.productService.getProductCategories());
        } catch (error) {
            const errorMessage = `Unexpected error when listing for product categories`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    };

    async createProductCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            logger.info(`Creating product category: ${JSON.stringify(req.body)}`);
            reply.code(StatusCodes.CREATED).send(await this.productService.createProductCategory(req.body as ProductCategoryDto));
        } catch (error) {
            const errorMessage = `Unexpected when creating for product category`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    };
}