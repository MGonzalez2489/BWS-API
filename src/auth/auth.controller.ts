import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
