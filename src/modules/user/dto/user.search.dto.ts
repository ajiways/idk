import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString, IsEmail } from "class-validator";

export class UserSearchDto {
  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @Expose()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
