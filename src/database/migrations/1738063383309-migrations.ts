import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738063383309 implements MigrationInterface {
    name = 'Migrations1738063383309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`picture\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`picture\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    }

}
