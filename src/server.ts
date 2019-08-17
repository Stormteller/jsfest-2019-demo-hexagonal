import appInitializer from './AppInitilizer';
import logger from './configuration/Logger';
import config from './configuration/Config';
import * as events from 'events';


class Server {

    private server: any;
    private readonly port: number;

    public constructor() {
        this.port = config.port;
    }

    public async runServer(): Promise<void> {
        try {
            const app = await appInitializer.initialize();
            this.server = app.listen(this.port);
            this.server.on('listening', () => {
                let address = this.server.address();
                logger.info(`Listening on port ${address.port}`);
            });

            this.server.on('error', (error: Error) => {
                logger.error('Server start error: ', error);
                process.exit(1);
            });
        } catch (error) {
            logger.error(error);
            // TODO: Graceful shutdown
        }
    }
}

export default new Server().runServer();
