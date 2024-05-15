import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.repository.create(createUserDto);

      await this.repository.save(user);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDTO) {
    try {
      const { limit = 10, offset = 0 } = pagination;

      return await this.repository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.repository.findOneBy({ publicId: id });
      if (!user) {
        throw new NotFoundException('Usuario no existe.');
      }
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      user = await this.repository.preload({
        id: user.id,
        publicId: id,
        ...updateUserDto,
      });

      return await this.repository.save(user);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.repository.remove(user);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
