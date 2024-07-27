import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@src/core/application/exceptions/baseException';

export class InvalidProductCategoryException extends BaseException {
	constructor(message: string) {
		super(message, InvalidProductCategoryException.name, StatusCodes.BAD_REQUEST);
	}
}
