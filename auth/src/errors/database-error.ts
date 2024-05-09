import { CustomError } from "./custom-error";


export class DatabaseError extends CustomError {

    private reason = 'Error connecting to Database';
    public statusCode = 500;

    constructor(){
        super('Error Connecting to DB');

        Object.setPrototypeOf(this, DatabaseError.prototype);
    };


    serializeError() {
        return [
            { message: this.reason }
        ]
    };
}