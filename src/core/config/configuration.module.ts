import { Module } from "@nestjs/common";
import { ConfigurationService } from "./configratuion.service";

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule { }
