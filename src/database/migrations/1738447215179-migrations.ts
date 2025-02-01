import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738447215179 implements MigrationInterface {
    name = 'Migrations1738447215179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`day_summaries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`summary\` longtext NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`day_summaries\` ADD CONSTRAINT \`FK_6296d3d06d2c853fc667fe40ca3\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day_summaries\` DROP FOREIGN KEY \`FK_6296d3d06d2c853fc667fe40ca3\``);
        await queryRunner.query(`DROP TABLE \`day_summaries\``);
    }

}
