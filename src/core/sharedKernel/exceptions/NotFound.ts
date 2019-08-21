export class NotFound extends Error {
    constructor(message: string = 'Not found') {
        super(message);
        Object.setPrototypeOf(this, NotFound.prototype);
    }
}
