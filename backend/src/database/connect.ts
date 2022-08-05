import { resolve } from 'path';
import { DataSource } from 'typeorm';
+
export const mySqlDatabase = new DataSource({
  type: 'mysql',
  host: 'database',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'social_media',
  entities: [
    resolve(__dirname, '..', 'modules', '**', 'entities,', '*.ts'),
  ],
  migrations: [
    resolve(__dirname, 'migrations', '*.ts'),
  ],
});

mySqlDatabase.initialize().then(() => console.log('connected to database'));
