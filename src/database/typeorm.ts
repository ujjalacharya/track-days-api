import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const typeORMconfig = {
    type: 'mysql',
    host: process.env.DB_ADDR,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: 'migration',
    keepConnectionAlive: true,
};

export default registerAs('typeorm', () => typeORMconfig);
export const connectionSource = new DataSource(typeORMconfig as DataSourceOptions);
