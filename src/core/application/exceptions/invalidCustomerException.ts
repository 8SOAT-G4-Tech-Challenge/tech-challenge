import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@application/exceptions/baseException';

export class InvalidCustomerException extends BaseException {
	constructor(message: string, status: StatusCodes = StatusCodes.BAD_REQUEST) {
		super(message, InvalidCustomerException.name, status);
	}
}
