import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@src/core/application/exceptions/baseException';

export class NotificationPaymentException extends BaseException {
	constructor(message: string) {
		super(message, NotificationPaymentException.name, StatusCodes.BAD_REQUEST);
	}
}
