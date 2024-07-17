import { BaseException } from "@src/core/application/exceptions/baseException";
import { StatusCodes } from "http-status-codes";

export class InvalidCustomerException extends BaseException {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    };
}