import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category, Service } from '../entities';
import { ServicesSeed } from './service.seed';

export default class ServiceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Service);
    const categoryRepo = dataSource.getRepository(Category);
    //hair
    const catHair = await categoryRepo.findOneBy({ name: 'cabello' });

    const hairServices = ServicesSeed.filter((f) => f.categoryId == catHair.id);
    await repo.insert(hairServices);
    //nails
    const nailCat = await categoryRepo.findOneBy({ name: 'uñas' });
    const nailsServices = ServicesSeed.filter(
      (f) => f.categoryId == nailCat.id,
    );
    await repo.insert(nailsServices);
  }
}
