import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { UserIdDto } from "./user.id.dto";
import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto extends UserIdDto {
  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsPhoneNumber()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  password?: string;
}
