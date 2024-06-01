import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../_config';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities';
import { mockUsersRepository, userEntities } from '../users/mock';
import { AuthDto } from './dto/auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
          useFactory: () => {
            return {
              secret: envs.jwt_secret,
              signOptions: {
                expiresIn: '2h',
              },
            };
          },
        }),
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should login user', async () => {
    const user = userEntities[0];
    const authDto = new AuthDto();
    authDto.email = user.email;
    authDto.password = '1234';
    const response = await service.login(authDto);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
    expect(response.token).not.toBeNull();
  });
  it('should not found a user', async () => {
    const authDto = new AuthDto();
    authDto.email = 'test@test.com';
    authDto.password = '1';
    let response: any;
    try {
      response = await service.login(authDto);
    } catch (error) {
      expect(response).toBeUndefined();
    }
  });
  it('should create a user', async () => {
    const user = userEntities[0];
    const authDto = new AuthDto();
    authDto.email = user.email;
    authDto.password = '1234';
    const response = await service.register(authDto);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('token');
    expect(response.token).not.toBeNull();
  });
  it('should not create again an existing user', async () => {
    const user = userEntities[0];
    const authDto = new AuthDto();
    authDto.email = user.email;
    authDto.password = '1234';
    let response: any;
    try {
      response = await service.register(authDto);
      console.log('r', response);
    } catch (error) {
      expect(response).toBeUndefined();
    }
  });
});
