import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@src/core/application/exceptions/baseException';

export class PaymentNotificationException extends BaseException {
	constructor(message: string) {
		super(message, PaymentNotificationException.name, StatusCodes.BAD_REQUEST);
	}
}
