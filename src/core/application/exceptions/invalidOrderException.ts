import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@exceptions/baseException';

export class InvalidOrderException extends BaseException {
	constructor(message: string) {
		super(message, InvalidOrderException.name, StatusCodes.BAD_REQUEST);
	}
}
