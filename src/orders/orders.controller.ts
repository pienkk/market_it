import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import {
  RequestGetOrderDto,
  RequestOrderStatusChangeDto,
} from "./dtos/request-orders.dto";
import { Try, createResponseForm } from "src/types";
import {
  ResponseOrderDetailDto,
  ResponseOrdersPageNationDto,
} from "./dtos/response-orders.dto";
import { PageNationDto } from "src/common/dtos/common.dto";

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

  /**
   * 단일 주문 조회
   */
  @Get(":orderIdx")
  async getOrder(
    @Param() requestGetOrderDto: RequestGetOrderDto,
  ): Promise<Try<ResponseOrderDetailDto>> {
    const order = await this.orderService.getOrder(requestGetOrderDto);

    return createResponseForm(order);
  }

  /**
   * 주문 목록 조회 (페이지네이션)
   */
  @Get()
  async getOrdersPageNation(
    @Query() pageNationDto: PageNationDto,
  ): Promise<Try<ResponseOrdersPageNationDto>> {
    const orders = await this.orderService.getOrdersPageNation(pageNationDto);

    return createResponseForm(orders);
  }
}
