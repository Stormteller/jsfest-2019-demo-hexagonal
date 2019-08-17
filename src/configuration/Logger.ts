import config from './Config';
import * as pino from 'pino';
import {Logger, LoggerOptions} from 'pino';

function initLogger(): Logger {
    let loggerOptions: LoggerOptions = {
        level: config.logger.level
    };

    if (config.node_env === 'local') {
        loggerOptions.prettyPrint = {
            colorize: true
        };
    }

    return pino(loggerOptions);
}

const logger = initLogger();

export default logger;
