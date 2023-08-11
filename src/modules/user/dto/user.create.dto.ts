import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsPhoneNumber, IsString, ValidateIf } from "class-validator";

export class UserCreateDto {
  @ApiProperty({ required: false, description: 'You need to pass phone or email' })
  @Expose()
  @ValidateIf((obj) => !Boolean(obj.email))
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ required: false, description: 'You need to pass phone or email' })
  @Expose()
  @ValidateIf((obj) => !Boolean(obj.phone))
  @IsEmail()
  email?: string;

  @ApiProperty()
  @Expose()
  @IsString()
  password: string;
}
