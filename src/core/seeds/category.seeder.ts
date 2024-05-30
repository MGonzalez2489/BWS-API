import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category } from '../entities';
import { CategorySeed } from './category.seed';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Category);
    const catSeed = CategorySeed;
    await repo.insert(catSeed);
  }
}
