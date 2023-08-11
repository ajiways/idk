import { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";
import { ConfigurationModule } from "../configuration.module";
import { ConfigurationService } from "../configratuion.service";

export const sequelizeConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigurationModule],
  inject: [ConfigurationService],
  useFactory: (config: ConfigurationService) => {
    const env = config.env;
    return {
      dialect: env.DB_DIALECT,
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      autoLoadModels: true,
      synchronize: false,
      logging: true,
    }
  }
}
