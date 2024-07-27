import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@exceptions/baseException';

export class DataNotFoundException extends BaseException {
	constructor(message: string) {
		super(message, DataNotFoundException.name, StatusCodes.BAD_REQUEST);
	}
}
