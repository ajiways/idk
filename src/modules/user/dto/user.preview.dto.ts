import { Expose } from "class-transformer";
import { UserIdDto } from "./user.id.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserPreviewDto extends UserIdDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  email: string = null;

  @Expose()
  @ApiProperty()
  phone: string = null;
}
