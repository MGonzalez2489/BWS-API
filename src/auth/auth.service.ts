import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) { }
  login(dto: AuthDto) {
    return this.userService.findByCredentials(dto.email, dto.password);
  }
  signIn(dto: AuthDto) {
    return this.userService.create(dto);
  }
}
