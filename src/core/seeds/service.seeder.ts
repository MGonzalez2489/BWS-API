import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Service } from '../entities';
import { ServiceHairSeed, ServiceUnasSeed } from './service.seed';

export default class ServiceSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Service);

    /////HAIR SEED
    const serviceHairSeed = ServiceHairSeed;
    await repo.insert(serviceHairSeed);

    /////UÑAS SEED
    const serviceUnasSeed = ServiceUnasSeed;
    await repo.insert(serviceUnasSeed);
  }
}
