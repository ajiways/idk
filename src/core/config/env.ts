import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { registerAs } from '@nestjs/config';
import { plainToClass, Transform } from 'class-transformer';
import { EDialect } from './types/sequelize-dialect.enum';

type TTransformerValue = { value: string | number };

export class EnvironmentConfig {
  @Transform(({ value }: TTransformerValue) =>
    Number(value) ? Number(value) : null,
  )
  @IsNumber()
  APP_PORT: number;

  @Transform(({ value }: TTransformerValue) =>
    Number(value) ? Number(value) : null,
  )
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_PASS: string;

  @IsEnum(EDialect)
  DB_DIALECT: EDialect;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

export default registerAs('testovoe-env', function (): EnvironmentConfig {
  const validatedConfig = plainToClass(EnvironmentConfig, process.env);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
});
