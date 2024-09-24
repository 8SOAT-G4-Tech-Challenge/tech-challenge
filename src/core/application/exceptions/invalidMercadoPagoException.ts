import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@application/exceptions/baseException';

export class InvalidMercadoPagoException extends BaseException {
	constructor(message: string, status: StatusCodes) {
		super(message, InvalidMercadoPagoException.name, status);
	}
}
