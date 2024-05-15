import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../dtos';

export abstract class BaseService<T> {
  private readonly logger: Logger;
  private readonly repo: Repository<T>;
  constructor(repo: Repository<T>, source: string) {
    this.repo = repo;
    this.logger = new Logger(source);
  }

  async paginate(pagination: PaginationDTO) {
    const { pageSize = 10, page = 1 } = pagination;

    const skip = (page - 1) * pageSize;

    return await this.repo.find({
      take: pageSize,
      skip,
    });
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
