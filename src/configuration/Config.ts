import {Level} from 'pino';
import * as DotEnv from 'dotenv';
import {DotenvConfigOptions} from 'dotenv';
import * as assert from 'assert';

export const ALLOWED_NODE_ENV = ['local', 'dev', 'staging', 'prod', 'test', 'ci'];

export interface ConfigInterface {
    port: number;
    host: string;
    apiPrefix: string;
    node_env: string;
    logger: {
        level: Level;
    };
    controllerPaths: string[];
    middlewarePaths: string[];
    diContainerModulesPath: string[];
}

function configuration(): ConfigInterface {
    const nodeEnv = process.env.NODE_ENV || 'local';
    assert(ALLOWED_NODE_ENV.indexOf(nodeEnv) > -1);
    const path = `env/.env.${nodeEnv}`;
    const dotEnvOptions: DotenvConfigOptions = {
        path: path
    };
    DotEnv.config(dotEnvOptions);
    return {
        port: parseInt(process.env.PORT || '8080', 10),
        host: process.env.HOST || 'http://localhost:8080',
        apiPrefix: '/api',
        node_env: process.env.NODE_ENV || 'local',
        logger: {
            level: process.env.NODE_ENV === 'local' ? 'debug' : 'info'
        },
        controllerPaths: [__dirname + '/../primaryAdapters/rest/**/*Controller.js'],
        middlewarePaths: [__dirname + '/../primaryAdapters/rest/common/HttpErrorHandlers.js'],
        diContainerModulesPath: [
            __dirname + '/../core/component/**/*ContainerModule.js',
            __dirname + '/../primaryAdapters/**/*ContainerModule.js',
            __dirname + '/../secondaryAdapters/**/*ContainerModule.js',
        ],
    };
}

const config = configuration();

export default config;
