import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "./dto/register.dto";
import { LogInDto } from "./dto/login.dto";
import { Public } from "../../core/decorators/public.decorator";
import { AuthResponseDto } from "./dto/auth.response.dto";

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: AuthResponseDto, status: HttpStatus.OK })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() arg: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.signUp(arg);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ type: AuthResponseDto, status: HttpStatus.CREATED })
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  singIn(@Body() arg: LogInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(arg);
  }
}
