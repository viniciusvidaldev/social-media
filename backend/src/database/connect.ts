import { resolve } from 'path';
import { DataSource } from 'typeorm';

const { db_host } = process.env;

export const mySqlDatabase = new DataSource({
  type: 'mysql',
  host: db_host,
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'social_media',
  entities: [
    'src/entities/*.ts',
  ],
  migrations: [
    resolve(__dirname, 'migrations', '*.ts'),
  ],
});

mySqlDatabase.initialize().then(() => console.log('connected to database'));
