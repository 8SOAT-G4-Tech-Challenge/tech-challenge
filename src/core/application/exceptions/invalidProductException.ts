import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@exceptions/baseException';

export class InvalidProductException extends BaseException {
	constructor(message: string, status: StatusCodes = StatusCodes.BAD_REQUEST) {
		super(message, InvalidProductException.name, status);
	}
}
