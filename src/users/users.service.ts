import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../common/dtos/pagination.dto';
import { BaseService } from '../common/services';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository, 'UserService');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.repository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.repository.save(user);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDTO) {
    try {
      return await this.searchPaginated(pagination);
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

  async findByEmail(email: string): Promise<User> | undefined {
    try {
      const user = await this.repository.findOneBy({ email });
      if (!user) {
        return undefined;
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

  async makeUserAsOwner(userPublicId: string) {
    try {
      let user = await this.findOne(userPublicId);
      if (user.isOwner) {
        throw new BadRequestException('El usuario ya es propietario');
      }
      user = await this.repository.preload({
        id: user.id,
        isOwner: true,
      });
      await this.repository.save(user);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  isValidUserPassword(plainText: string, hash: string): boolean {
    const hasAccess: boolean = bcrypt.compareSync(plainText, hash);
    return hasAccess;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.repository.remove(user);
  }
}
