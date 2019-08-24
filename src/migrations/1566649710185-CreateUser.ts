import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1566649710185 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const userTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            phone VARCHAR(20) NOT NULL,
            username VARCHAR(50) NOT NULL,
            notification_tokens VARCHAR(60)[] DEFAULT '{}'
          );
          CREATE UNIQUE INDEX users_phonenumber_uindex
            ON "users" (phone);
          CREATE UNIQUE INDEX users_username_uindex
            ON "users" (username);
        `;

        await queryRunner.query(userTableQuery);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
