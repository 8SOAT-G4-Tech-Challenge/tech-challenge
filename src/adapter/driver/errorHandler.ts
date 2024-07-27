import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { BaseException } from '@exceptions/baseException';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	let responseError = {
		path: request.url,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: error.message
	};

	if (error instanceof ZodError) {
		responseError.message = 'Error during validation';
		console.log('Hahahahaha', error);
	}

	if (error instanceof BaseException) {
		responseError.message = error.message;
		responseError.status = error.statusCode;
	}

	return reply.status(responseError.status).send(responseError);
};

export function handleError(
	req: FastifyRequest,
	reply: FastifyReply,
	error: any,
	message?: string
): void {
	const responseError = {
		path: req.url,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: message ? message : error.message
	};

	if (error instanceof BaseException) {
		responseError.message = error.message;
		responseError.status = error.statusCode;
	}

	reply.status(responseError.status).send(responseError);
}
