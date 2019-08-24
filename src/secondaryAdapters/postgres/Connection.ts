import {Connection, createConnection, getConnectionOptions} from 'typeorm';

export async function createConnectionPool(): Promise<Connection> {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
        synchronize: false,
        logging: true,
        entities: ['dist/secondaryAdapters/postgres/**/*Entity.js'],
        migrations: ['dist/migrations/*.js'],
        migrationsDir: 'dist/migrations',
        migrationsRun: true
    });
    return await createConnection(connectionOptions);
}
