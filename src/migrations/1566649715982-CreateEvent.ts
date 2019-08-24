import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEvent1566649715982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const typeEnumQuery = `
        CREATE TYPE EVENT_TYPE AS ENUM (
            'WORK',
            'PERSONAL'
        );`;

        const eventTableQuery = `
        CREATE TABLE IF NOT EXISTS event (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            creator_id INT NOT NULL,
            event_type EVENT_TYPE,
            start_date TIMESTAMP,
            end_date TIMESTAMP,
            created_at TIMESTAMP DEFAULT now(),
            FOREIGN KEY (creator_id) REFERENCES users(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
        );`;

        await queryRunner.query(typeEnumQuery);
        await queryRunner.query(eventTableQuery);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
