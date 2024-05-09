import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Api Not Found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError(): { message: string; field?: string | undefined; }[] {
        return [
            { 
                message: 'Not Found'
            }
        ]
    };

}