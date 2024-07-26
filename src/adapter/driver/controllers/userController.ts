import { User } from '@prisma/client';
import { UserService } from '@services/userService';
import { handleError } from '@src/core/common/errorHandler';
import logger from '@src/core/common/logger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

export class UserController {
	constructor(private readonly userService: UserService) { }
	
	async getUsers(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing users');
			const users: User[] = await this.userService.getUsers();
			reply.code(StatusCodes.OK).send(users);
		} catch (error) {
			const errorMessage = `Unexpected error when listing for users`;
            logger.error(`${errorMessage}: ${error}`);
            handleError(req, reply, error);
		}
	};
}
