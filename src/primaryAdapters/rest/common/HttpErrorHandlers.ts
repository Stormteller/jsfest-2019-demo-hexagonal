import {ApiError} from './data/ApiError';
import express = require('express');
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { injectable } from 'inversify';
import { ValidationError } from 'class-validator';
import {NotFound} from '../../../core/sharedKernel/exceptions/NotFound';
import {Unauthorized} from '../../../core/sharedKernel/exceptions/Unauthorized';
import {BadRequest} from '../../../core/sharedKernel/exceptions/BadRequest';
import {Forbidden} from '../../../core/sharedKernel/exceptions/Forbidden';

interface HandlerResult {
    errors: ApiError[];
    code: number;
}

interface ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult;
}

class ValidationErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult {
        console.error(error, 'Validation error');
        return {
            errors: error
                .map(e => Object.values(e.constraints))
                .reduce((acc, el) => acc.concat(el), [])
                .map(m => new ApiError(m)),
            code: 400
        };
    }
}

class NotFoundErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult {
        console.error(error, 'Not found');
        return {
            errors: [new ApiError(error.message)],
            code: 404
        };
    }
}

class BadRequestErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult {
        console.error(error, 'Bad request');
        return {
            errors: [new ApiError(error.message)],
            code: 400
        };
    }
}

class UnauthorizedErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult {
        console.error(error, 'Unauthorized');
        return {
            errors: [new ApiError(error.message)],
            code: 401
        };
    }
}

class ForbiddenErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request): HandlerResult {
        console.error(error, 'Forbidden');
        return {
            errors: [new ApiError(error.message)],
            code: 403
        };
    }
}

class UnhandledErrorHandler implements ErrorHandler {
    handle(error: any, request: express.Request) {
        console.error(error, 'Unhandled exception');
        let message = error.message;
        return {
            errors: [new ApiError(message)],
            code: 500
        };
    }
}

@injectable()
@Middleware({type: 'after', priority: 1})
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(error: any, request: express.Request, response: express.Response, next: express.NextFunction): void {
        const handler = this.getErrorHandler(error);
        let {code, errors} = handler.handle(error, request);
        response.status(code).json(errors);
        next();
    }

    private getErrorHandler(error: any): ErrorHandler {
        if (Array.isArray(error) && error.every((element) => element instanceof ValidationError)) {
            return new ValidationErrorHandler();
        } else if (error instanceof NotFound) {
            return new NotFoundErrorHandler();
        } else if (error instanceof Unauthorized) {
            return new UnauthorizedErrorHandler();
        } else if (error instanceof BadRequest) {
            return new BadRequestErrorHandler();
        } else if (error instanceof Forbidden) {
            return new ForbiddenErrorHandler();
        } else {
            return new UnhandledErrorHandler();
        }
    }
}
