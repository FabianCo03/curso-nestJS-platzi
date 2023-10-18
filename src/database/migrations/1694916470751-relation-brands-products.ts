import { MigrationInterface, QueryRunner } from "typeorm";

export class relationBrandsProducts1694916470751 implements MigrationInterface {
    name = 'relationBrandsProducts1694916470751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "company"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandsId" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9eb6eeb7eb88ca8f4b4f7e35879" FOREIGN KEY ("brandsId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9eb6eeb7eb88ca8f4b4f7e35879"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandsId"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "company" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
