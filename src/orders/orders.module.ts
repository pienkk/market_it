import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
