import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/orders.entity";
import { Repository } from "typeorm";
import { RequestOrderStatusChangeDto } from "./dtos/request-orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  /**
   * 주문 접수 처리
   */
  async acceptOrder(
    requestOrderStatusChangeDto: RequestOrderStatusChangeDto,
  ): Promise<string> {
    const order = await this.orderRepository.findOne({
      where: { orderIdx: requestOrderStatusChangeDto.orderIdx },
    });

    // 주문이 존재하지 않을 경우
    if (!order) {
      throw new HttpException(
        {
          code: "1000",
          message: "해당 주문이 존재하지 않습니다.",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // 주문 상태가 주문 대기 상태가 아닐 경우
    if (order.status !== "ORDER_PENDING") {
      throw new HttpException(
        {
          code: "1001",
          message: "주문 대기 상태의 주문만 접수할 수 있습니다.",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.orderRepository.update(order.orderIdx, {
      status: "ORDER_ACCEPTED",
    });

    return "주문 접수 처리 완료";
  }
}
