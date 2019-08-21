export class Forbidden extends Error {
    constructor(message: string = 'Action forbidden') {
        super(message);
        Object.setPrototypeOf(this, Forbidden.prototype);
    }
}
