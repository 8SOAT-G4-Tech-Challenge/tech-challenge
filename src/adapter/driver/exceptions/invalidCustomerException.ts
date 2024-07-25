import { BaseException } from '@driver/exceptions/baseException';
import { StatusCodes } from 'http-status-codes';

export class InvalidCustomerException extends BaseException {
    constructor(message: string, status: StatusCodes = StatusCodes.BAD_REQUEST) {
        super(message, InvalidCustomerException.name, status);
    };
}
