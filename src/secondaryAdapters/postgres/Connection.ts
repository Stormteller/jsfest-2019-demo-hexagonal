import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export async function createConnectionPool(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        synchronize: false,
        logging: true,
        entities: ['dist/src/secondaryAdapters/postgres/**/*Entity.js'],
        migrations: ['dist/src/migrations/*.js'],
        migrationsDir: 'dist/src/migrations',
        migrationsRun: true
    });
    return await createConnection(connectionOptions);
}
