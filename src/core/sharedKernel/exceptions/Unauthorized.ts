export class Unauthorized extends Error {
    constructor(message: string = 'Unauthorized') {
        super(message);
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
}
