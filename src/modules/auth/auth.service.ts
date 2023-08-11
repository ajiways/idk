import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { compare } from 'bcrypt';
import { UtilsService } from '../../core/services/utils.service';
import { LogInDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {
  private readonly utils = UtilsService;

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signUp(dto: RegisterDto): Promise<any> {
    const user = await this.usersService.create(dto);

    const payload = { sub: user.id, email: user.email ?? null, phone: user.phone ?? null };

    return plainToInstance(AuthResponseDto, { token: await this.jwtService.signAsync(payload) });
  }

  async signIn(dto: LogInDto): Promise<any> {
    const { email, phone } = dto;
    const user = await this.usersService.getFullUser(this.utils.mapSearchBy({ email, phone }));

    const passwordMatch = await compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email ?? null, phone: user.phone ?? null };

    return plainToInstance(AuthResponseDto, { token: await this.jwtService.signAsync(payload) });
  }
}
