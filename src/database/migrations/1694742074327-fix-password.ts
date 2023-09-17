import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPassword1694742074327 implements MigrationInterface {
    name = 'fixPassword1694742074327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" integer NOT NULL`);
    }

}
