import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  @Post('signin')
  @Public()
  signin(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
