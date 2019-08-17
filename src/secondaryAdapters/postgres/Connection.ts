import {Connection, createConnection, getConnectionOptions} from 'typeorm';
import config from '../configuration/Config';

export async function createConnectionPool(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        synchronize: true,
        logging: true,
        entities: ['dist/src/secondaryAdapters/postgres/**/data/*Entity.js'],
        migrations: ['dist/src/migrations/*.js'],
        migrationsDir: 'dist/src/migrations',
        migrationsRun: true
    });
    return await createConnection(connectionOptions);
}
