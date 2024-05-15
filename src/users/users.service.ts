import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';
import { BaseService } from 'src/common/services';

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
      //TODO: Return access token
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDTO) {
    try {
      return await this.paginate(pagination);
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
  async findByCredentials(email: string, password: string) {
    try {
      const user = await this.repository.findOneBy({ email });
      if (!user) {
        return new NotFoundException('Usuario no existe');
      }

      const hasAccess = bcrypt.compareSync(password, user.password);
      if (!hasAccess) {
        return new UnauthorizedException('Acceso denegado');
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
}
