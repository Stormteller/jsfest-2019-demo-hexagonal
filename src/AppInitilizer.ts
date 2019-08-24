import * as express from 'express';
import {Container} from 'inversify';
import * as ExpressPinoLogger from 'express-pino-logger';
import * as bodyParser from 'body-parser';

import config from './configuration/Config';
import logger from './configuration/Logger';
import {
    Action,
    RoutingControllersOptions,
    useContainer as useContainerRoutingController,
    useExpressServer
} from 'routing-controllers';
import {createDIContainer} from './configuration/DIContainer';
import {createConnectionPool} from './secondaryAdapters/postgres/Connection';

class AppInitializer {
    public app: express.Application;
    public router: express.Router;
    public diContainer: Container;
    public routingControllerOptions: RoutingControllersOptions;

    public async initialize(): Promise<express.Application> {

        this.app = express();

        this.initHttpLogging();

        this.initContainer();

        await this.initDatabase();

        this.initMiddleware();

        this.initRoutes();

        return this.app;
    }

    private async initDatabase(): Promise<void> {
        await createConnectionPool();
    }

    private initMiddleware(): void {
        this.app.disable('x-powered-by');
        this.app.use(bodyParser.urlencoded({'extended': true}));
        this.app.use(bodyParser.json());
    }

    private initRoutes(): void {
        this.router = express.Router();
        this.routingControllerOptions = {
            controllers: config.controllerPaths,
            middlewares: config.middlewarePaths,
            routePrefix: config.apiPrefix,
            defaultErrorHandler: false,
            validation: true,
            classTransformer: true,
            authorizationChecker: (action: Action) => action.request.get('user_id') != null,
            currentUserChecker: (action: Action) => Number(action.request.get('user_id'))
        };
        useContainerRoutingController(this.diContainer);
        useExpressServer(this.app, this.routingControllerOptions);
        this.app.use(this.router);
    }

    private initContainer(): void {
        this.diContainer = createDIContainer(config.diContainerModulesPath);
    }

    private initHttpLogging() {
        this.app.use(ExpressPinoLogger({
            logger: logger
        }));
    }

}

export default new AppInitializer();
