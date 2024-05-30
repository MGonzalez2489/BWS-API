import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Category } from "../entities";
import { PaginationDTO } from "../../common/dtos";
import { CategorySeed } from "../seeds/category.seed";
import { randomUUID } from "crypto";

const categorySeed = CategorySeed;
const categoryEntities: Category[] =
  categorySeed.map((catSeed, index) => ({ ...catSeed, id: index, publicId: randomUUID(), services: [], createdAt: 'no-value', updatedAt: 'no-value', deletedAt: 'no-Value' }));
describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    findOneBy: jest.fn().mockResolvedValue(categoryEntities[0]),
    findAll: jest.fn(),
    count: jest.fn().mockResolvedValue(categoryEntities.length),
    find: jest.fn().mockResolvedValue(categoryEntities),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, {
        provide: getRepositoryToken(Category),
        useValue: mockCategoryRepository
      }],
    }).compile();
    service = module.get<CategoryService>(CategoryService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should return a paginated list', async () => {
    const pagination = new PaginationDTO();
    const response = await service.findAll(pagination);
    expect(response).toHaveProperty('collection')
    expect(response.collection.length).toBeGreaterThan(1);
    expect(response.totalPages).toBeGreaterThan(0);
    expect(response.totalRecords).toBeGreaterThan(0);

  })

  it('should find one', async () => {
    const publicId = categoryEntities[0].publicId;
    const response = await service.findById(publicId);
    expect(response).toBeDefined();
  })

});
