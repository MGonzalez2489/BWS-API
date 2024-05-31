import { randomUUID } from 'crypto';
import { ServicesSeed } from '../seeds/service.seed';

const seed = ServicesSeed;
const serviceEntities = seed.map((serSeed, index) => ({
  ...serSeed,
  id: index + 1,
  publicId: randomUUID(),
}));

const mockServicesRepository = {
  count: jest.fn().mockResolvedValue(serviceEntities.length),
  find: jest.fn().mockResolvedValue(serviceEntities),
  findBy: jest.fn().mockResolvedValue(serviceEntities),
  findById: jest.fn().mockResolvedValue(serviceEntities[0]),
  findOneBy: jest.fn().mockResolvedValue(serviceEntities[0]),
};
//
export { mockServicesRepository, serviceEntities };
