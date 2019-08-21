export class BadRequest extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}
