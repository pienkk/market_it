import { Module } from "@nestjs/common";
import { DataBaseConfigService } from "./database.service";

@Module({
  providers: [DataBaseConfigService],
})
export class DataBaseConfigModule {}
