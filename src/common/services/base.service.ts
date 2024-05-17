import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationDTO } from '../dtos';

export abstract class BaseService<T> {
  private readonly logger: Logger;
  private readonly repo: Repository<T>;
  constructor(repo: Repository<T>, source: string) {
    this.repo = repo;
    this.logger = new Logger(source);
  }

  async searchPaginated(pagination: PaginationDTO, where: object = null) {
    const { pageSize = 10, page = 1 } = pagination;

    const skip = (page - 1) * pageSize;

    const findObj: FindManyOptions<T> = {
      take: pageSize,
      skip,
    };
    if (where) {
      findObj.where = where;
    }
    const total = where
      ? await this.repo.count({ where })
      : await this.repo.count();
    const collection = await this.repo.find(findObj);

    const totalPages = Math.ceil(total / pageSize);

    const result = {
      collection,
      totalRecords: total,
      totalPages,
    };
    return result;
  }

  handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
