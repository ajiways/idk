import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { ConfigurationModule } from "../../core/config/configuration.module";
import { ConfigurationService } from "../../core/config/configratuion.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (config: ConfigurationService) => {
        const env = config.env;
        return {
          secret: env.JWT_SECRET,
          signOptions: {
            expiresIn: env.JWT_EXPIRES_IN,
          },
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
