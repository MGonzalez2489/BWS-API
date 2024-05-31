import { Test, TestingModule } from '@nestjs/testing';
import { ServiceService } from './services.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category, Service } from '../entities';
import { CategoryService } from './category.service';
import {
  categoryEntities,
  mockCategoryRepository,
  mockServicesRepository,
  serviceEntities,
} from '../mock';
import { PaginationDTO } from '../../common/dtos';

describe('ServicesService', () => {
  let service: ServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: getRepositoryToken(Service),
          useValue: mockServicesRepository,
        },
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();
    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a paginated list', async () => {
    const pagination = new PaginationDTO();

    const response = await service.findAll(pagination);
    expect(response).toHaveProperty('collection');
    expect(response.collection.length).toBeGreaterThan(1);
    expect(response.totalPages).toBeGreaterThan(0);
    expect(response.totalRecords).toBeGreaterThan(0);
  });

  it('should find by category', async () => {
    const category = categoryEntities[0];
    const response = await service.findByCategory(category.publicId);
    expect(response).toBeDefined();
  });

  it('should find one', async () => {
    const publicId = serviceEntities[0].publicId;
    const response = await service.findOne(publicId);
    expect(response).toBeDefined();
  });
  it('should not find one', async () => {
    const publicId = 'test';
    const response = await service.findOne(publicId);
    expect(response).toBeDefined();
  });
});
