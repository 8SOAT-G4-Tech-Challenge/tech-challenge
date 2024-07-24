import { BaseException } from "@driver/exceptions/baseException";
import { StatusCodes } from "http-status-codes";

export class InvalidCustomerException extends BaseException {
    constructor(message: string) {
        super(message, InvalidCustomerException.name, StatusCodes.BAD_REQUEST);
    };
}