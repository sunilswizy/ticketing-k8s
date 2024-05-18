import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode: number = 401;

    constructor() {
        super('UnAuthorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }


    serializeError(): { message: string; field?: string | undefined; }[] {
        return [{
            message: 'UnAuthorized'
        }]
    }
}