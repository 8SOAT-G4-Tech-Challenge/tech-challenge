import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { BaseException } from '@driver/exceptions/baseException';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
	let responseError = {
		path: request.url,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: error.message,
		details: []
	};

	if (error instanceof ZodError) {
		responseError.message = 'Error during validation';
	}

	if (error instanceof BaseException) {
		responseError.message = error.message;
		responseError.status = error.statusCode;
	}

	return reply.status(responseError.status).send(responseError);
};

export function handleError(req: FastifyRequest, reply: FastifyReply, error: any, message?: string): void {
	const responseError = {
		path: req.url,
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: message ? message : error.message,
		details: []
	};

	if (error instanceof BaseException) {
		responseError.message = error.message;
		responseError.status = error.statusCode;
	} 

	reply.status(responseError.status).send(responseError);
};