import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1737391123573 implements MigrationInterface {
    name = 'Migrations1737391123573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`performed_tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`date\` datetime NOT NULL, \`status\` enum ('AllDone', 'AlmostDone', 'HalfDone') NOT NULL DEFAULT 'HalfDone', \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks_and_performed_tasks\` (\`performed_task_id\` int NOT NULL, \`task_id\` int NOT NULL, INDEX \`IDX_7a4f1cb0af4a25cbd0a89fb85e\` (\`performed_task_id\`), INDEX \`IDX_aed8996d81f9a18723a217dde3\` (\`task_id\`), PRIMARY KEY (\`performed_task_id\`, \`task_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_db55af84c226af9dce09487b61b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`performed_tasks\` ADD CONSTRAINT \`FK_0b3acba83120d95b04fc7a18a0d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks_and_performed_tasks\` ADD CONSTRAINT \`FK_7a4f1cb0af4a25cbd0a89fb85ec\` FOREIGN KEY (\`performed_task_id\`) REFERENCES \`performed_tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tasks_and_performed_tasks\` ADD CONSTRAINT \`FK_aed8996d81f9a18723a217dde3e\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks_and_performed_tasks\` DROP FOREIGN KEY \`FK_aed8996d81f9a18723a217dde3e\``);
        await queryRunner.query(`ALTER TABLE \`tasks_and_performed_tasks\` DROP FOREIGN KEY \`FK_7a4f1cb0af4a25cbd0a89fb85ec\``);
        await queryRunner.query(`ALTER TABLE \`performed_tasks\` DROP FOREIGN KEY \`FK_0b3acba83120d95b04fc7a18a0d\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_db55af84c226af9dce09487b61b\``);
        await queryRunner.query(`DROP INDEX \`IDX_aed8996d81f9a18723a217dde3\` ON \`tasks_and_performed_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a4f1cb0af4a25cbd0a89fb85e\` ON \`tasks_and_performed_tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks_and_performed_tasks\``);
        await queryRunner.query(`DROP TABLE \`performed_tasks\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
