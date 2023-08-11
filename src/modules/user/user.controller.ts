import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserIdDto } from "./dto/user.id.dto";
import { UserCreateDto } from "./dto/user.create.dto";
import { UserSearchDto } from "./dto/user.search.dto";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserService } from "./user.service";
import { UserPreviewDto } from "./dto/user.preview.dto";

@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @ApiOperation({ description: 'Get users list' })
  @ApiResponse({ type: UserPreviewDto, isArray: true, status: HttpStatus.OK })
  @Get('/list')
  async getAll(@Query() arg: UserSearchDto): Promise<UserPreviewDto[]> {
    return this.userService.findAll(arg);
  }

  @ApiOperation({ description: 'User creation' })
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({ type: UserPreviewDto, status: HttpStatus.CREATED })
  @Post()
  async create(@Body() arg: UserCreateDto): Promise<UserPreviewDto> {
    return this.userService.create(arg);
  }

  @ApiOperation({ description: 'User deletion' })
  @ApiParam({ name: 'id', type: UserIdDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() arg: UserIdDto): Promise<void> {
    await this.userService.remove(arg);
  }

  @ApiOperation({ description: 'User update' })
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put()
  async update(@Body() arg: UserUpdateDto): Promise<void> {
    await this.userService.update(arg);
  }

  @ApiOperation({ description: 'Get user' })
  @ApiParam({ name: 'id', type: UserIdDto })
  @ApiResponse({ type: UserPreviewDto, status: HttpStatus.OK })
  @Get('/:id')
  async get(@Param() arg: UserIdDto): Promise<UserPreviewDto> {
    return this.userService.findOne(arg);
  }
}
