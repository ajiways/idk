import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class UserIdDto {
  @ApiProperty()
  @Expose()
  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;
}
