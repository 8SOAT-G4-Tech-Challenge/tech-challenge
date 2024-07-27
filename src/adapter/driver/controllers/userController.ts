import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { handleError } from '@driver/errorHandler';
import { User } from '@prisma/client';
import { UserService } from '@services/userService';
import logger from '@src/core/common/logger';

export class UserController {
	private readonly userService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	async getUsers(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing users');
			const users: User[] = await this.userService.getUsers();
			reply.code(StatusCodes.OK).send(users);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for users';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
