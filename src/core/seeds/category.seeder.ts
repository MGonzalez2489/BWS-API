import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Category } from '../entities';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Category);
    await repo.insert([
      {
        name: 'cabello',
        displayName: 'Cabello',
        icon: 'images/icons/haircut.png',
      },
      {
        name: 'uñas',
        displayName: 'Uñas',
        icon: 'images/icons/nails.png',
      },
      {
        name: 'maquillaje',
        displayName: 'Maquillaje',
        icon: 'images/icons/cosmetics.png',
      },
      {
        name: 'barberia',
        displayName: 'Barberia',
        icon: 'images/icons/barber.png',
      },
    ]);
  }
}
