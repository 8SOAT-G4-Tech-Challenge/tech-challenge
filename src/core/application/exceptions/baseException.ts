export class BaseException extends Error {
    public statusCode: number;
    public name: string;

    constructor(message: string, name: string, statusCode: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    };
}