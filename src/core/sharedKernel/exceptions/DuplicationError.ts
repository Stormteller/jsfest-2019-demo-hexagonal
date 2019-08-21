import {BadRequest} from './BadRequest';

export class DuplicationError extends BadRequest {
    constructor(message: string = 'Already exists') {
        super(message);
        Object.setPrototypeOf(this, DuplicationError.prototype);
    }
}
