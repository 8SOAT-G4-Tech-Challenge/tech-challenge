import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@driver/exceptions/baseException';

export class InvalidOrderStatusException extends BaseException {
	constructor(message: string) {
		super(message, InvalidOrderStatusException.name, StatusCodes.BAD_REQUEST);
	}
}
