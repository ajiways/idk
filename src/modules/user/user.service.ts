import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { UserCreateDto } from "./dto/user.create.dto";
import { UserPreviewDto } from "./dto/user.preview.dto";
import { UserSearchDto } from "./dto/user.search.dto";
import { plainToInstance } from "class-transformer";
import { UserIdDto } from "./dto/user.id.dto";
import { UserUpdateDto } from "./dto/user.update.dto";
import { WhereOptions } from "sequelize";
import { Repository } from "sequelize-typescript";
import { hash } from "bcrypt";
import { UtilsService } from "../../core/services/utils.service";

@Injectable()
export class UserService {
  private readonly utils = UtilsService;

  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>
  ) { }

  private makePreview(user: User): UserPreviewDto;
  private makePreview(users: User[]): UserPreviewDto[];
  private makePreview(users: User | User[]): UserPreviewDto | UserPreviewDto[] {
    return plainToInstance(UserPreviewDto, users, { excludeExtraneousValues: true });
  }

  private async findOneByOrThrow(by: WhereOptions<User>, notFound = true, errorMessage = 'User not found'): Promise<User> {
    const candidate = await this.userRepository.findOne({ where: by });

    if (!candidate) {
      if (notFound) {
        throw new NotFoundException(errorMessage);
      }
      throw new BadRequestException(errorMessage);
    }

    return candidate;
  }

  public async create(dto: UserCreateDto): Promise<UserPreviewDto> {
    const searchBy = this.utils.mapSearchBy(dto);

    const candidate = await this.userRepository.findOne({ where: searchBy });

    if (candidate) {
      throw new BadRequestException('Bad credentials');
    }

    const hashedPass = await hash(dto.password, 6);

    const user = await this.userRepository.create({ email: dto.email ?? null, phone: dto.phone ?? null, password: hashedPass });

    return this.makePreview(user);
  }

  public async findAll(dto: UserSearchDto): Promise<UserPreviewDto[]> {
    const searchBy = this.utils.mapSearchBy(dto);

    const matches = await this.userRepository.findAll({ where: searchBy });

    return this.makePreview(matches);
  }

  public async findOne(dto: UserIdDto): Promise<UserPreviewDto | null> {
    const user = await this.findOneByOrThrow({ id: dto.id });

    return this.makePreview(user);
  }

  public async getFullUser(getBy: WhereOptions<User>): Promise<User | null> {
    return await this.userRepository.findOne({ where: getBy })
  }

  public async remove(dto: UserIdDto): Promise<void> {
    const candidate = await this.findOneByOrThrow({ id: dto.id });

    await candidate.destroy();
  }

  public async update(dto: UserUpdateDto): Promise<void> {
    const candidate = await this.findOneByOrThrow({ id: dto.id });

    await this.userRepository.update(dto, { where: { id: candidate.id } })
  }
}
