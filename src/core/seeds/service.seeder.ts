import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category, Service } from '../entities';

export default class ServiceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Service);
    const categoryRepo = dataSource.getRepository(Category);

    const catHair = await categoryRepo.findOneBy({ name: 'cabello' });

    await repo.insert([
      { name: 'corte_hombre', displayName: 'Corte Hombre', category: catHair },
      { name: 'corte_mujer', displayName: 'Corte Mujer', category: catHair },
      { name: 'corte_nino', displayName: 'Corte Niño', category: catHair },
      { name: 'corte_nina', displayName: 'Corte Niña', category: catHair },
    ]);

    const nailCat = await categoryRepo.findOneBy({ name: 'uñas' });

    await repo.insert([
      { name: 'shellac', displayName: 'Shellac', category: nailCat },
      { name: 'manicura', displayName: 'Manicura', category: nailCat },
    ]);
  }
}
