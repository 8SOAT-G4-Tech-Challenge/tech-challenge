import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@exceptions/baseException';

export class InvalidPaymentOrderException extends BaseException {
	constructor(message: string) {
		super(message, InvalidPaymentOrderException.name, StatusCodes.BAD_REQUEST);
	}
}
