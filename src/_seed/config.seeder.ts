import { envs } from './../_config/envs';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './init.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: envs.db_host,
  port: envs.db_port,
  database: envs.db_name,
  username: envs.db_user,
  password: envs.db_pass,
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  synchronize: true,
  seedTracking: true,
  seeds: [InitSeeder],
};
export const source = new DataSource(options);
