import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@application/exceptions/baseException';

export class InvalidCustomerException extends BaseException {
	constructor(message: string) {
		super(message, InvalidCustomerException.name, StatusCodes.BAD_REQUEST);
	}
}
