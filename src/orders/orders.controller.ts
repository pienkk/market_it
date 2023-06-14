import { Body, Controller, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { RequestOrderStatusChangeDto } from "./dtos/request-orders.dto";
import { Try, createResponseForm } from "src/types";

@Controller("orders")
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  /**
   * 주문 접수 처리
   */
  @Post("accept")
  async acceptOrder(
    @Body() requestOrderStatusChangeDto: RequestOrderStatusChangeDto,
  ): Promise<Try<string>> {
    const message = await this.orderService.acceptOrder(
      requestOrderStatusChangeDto,
    );

    return createResponseForm(message);
  }

  /**
   * 주문 완료 처리
   */
  @Post("complete")
  async completeOrder(
    @Body() requestOrderStatusChangeDto: RequestOrderStatusChangeDto,
  ): Promise<Try<string>> {
    const message = await this.orderService.completeOrder(
      requestOrderStatusChangeDto,
    );

    return createResponseForm(message);
  }
}
