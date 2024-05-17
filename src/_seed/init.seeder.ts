import CategorySeeder from '../core/seeds/category.seeder';
import { DataSource } from 'typeorm';
import { Seeder, runSeeders } from 'typeorm-extension';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    //TODO: review if it is possible to change importing routes for the path below
    // const seedRoute = __dirname + '/../../src/**/*.seeder.ts';
    await runSeeders(dataSource, {
      seeds: [CategorySeeder],
    });
  }
}
