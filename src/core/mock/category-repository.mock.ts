import { randomUUID } from 'crypto';
import { CategorySeed } from '../seeds/category.seed';

const seed = CategorySeed;
const categoryEntities = seed.map((catSeed, index) => ({
  ...catSeed,
  id: index + 1,
  publicId: randomUUID(),
}));

const mockCategoryRepository = {
  findOneBy: jest.fn().mockResolvedValue(categoryEntities[0]),
  count: jest.fn().mockResolvedValue(categoryEntities.length),
  find: jest.fn().mockResolvedValue(categoryEntities),
};

export { mockCategoryRepository, categoryEntities };
