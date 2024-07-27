import { ProductCategoryService } from '@services/productCategoryService';
import { handleError } from '@driver/errorHandler';
import logger from '@common/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export class ProductCategoryController {
    constructor(private readonly productCategoryService: ProductCategoryService) { }

    async getProductCategories(req: FastifyRequest, reply: FastifyReply) {
        try {
            logger.info('Listing product categories');
            reply.code(StatusCodes.OK).send(await this.productCategoryService.getProductCategories());
        } catch (error) {
            const errorMessage = `Unexpected error when listing for product categories`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    };

    async createProductCategory(req: FastifyRequest, reply: FastifyReply) {
        try {
            logger.info(`Creating product category: ${JSON.stringify(req.body)}`);
            reply.code(StatusCodes.CREATED).send(await this.productCategoryService.createProductCategory(req.body));
        } catch (error) {
            const errorMessage = `Unexpected when creating for product category`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
        }
    };
}