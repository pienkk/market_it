import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DataBaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get("DB_HOST"),
      port: this.configService.get("DB_PORT"),
      username: this.configService.get("DB_USERNAME"),
      password: this.configService.get("DB_PASSWORD"),
      database: this.configService.get("DB_DATABASE"),
      entities: [__dirname + "../../../**/*.entity{.ts,.js}"],

      // 테스트 환경일 경우에만 dropSchema, synchronize 옵션을 true로 설정
      dropSchema: this.configService.get("NODE_ENV") === "test" ? true : false,
      synchronize: this.configService.get("NODE_ENV") === "test" ? true : false,
      logging: true,
    };
  }
}
