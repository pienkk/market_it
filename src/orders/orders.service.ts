import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/orders.entity";
import { Repository } from "typeorm";
import {
  RequestGetOrderDto,
  RequestOrderStatusChangeDto,
} from "./dtos/request-orders.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  /**
   * 주문 존재 여부 검증
   */
  private async validateOrder(orderIdx: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { orderIdx: orderIdx },
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

    return order;
  }

  /**
   * 주문 접수 처리
   */
  async acceptOrder(
    requestOrderStatusChangeDto: RequestOrderStatusChangeDto,
  ): Promise<string> {
    // 주문 존재 검증
    const order = await this.validateOrder(
      requestOrderStatusChangeDto.orderIdx,
    );

    // 주문 상태가 주문 대기 상태가 아닌 경우
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

  /**
   * 주문 완료 처리
   */
  async completeOrder(
    requestOrderStatusChangeDto: RequestOrderStatusChangeDto,
  ): Promise<string> {
    // 주문 존재 검증
    const order = await this.validateOrder(
      requestOrderStatusChangeDto.orderIdx,
    );

    // 주문 상태가 주문 접수 상태가 아닌 경우
    if (order.status !== "ORDER_ACCEPTED") {
      throw new HttpException(
        {
          code: "1002",
          message: "주문 접수 상태의 주문만 완료할 수 있습니다.",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.orderRepository.update(order.orderIdx, {
      status: "ORDER_COMPLETED",
    });

    return "주문 완료 처리 완료";
  }

  /**
   * 단일 주문 조회
   */
  async getOrder(requestGetOrderDto: RequestGetOrderDto): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      select: {
        orderIdx: true,
        quantity: true,
        price: true,
        status: true,
        createdAt: true,
        user: {
          name: true,
        },
        product: {
          productIdx: true,
          name: true,
          description: true,
          price: true,
        },
      },
      where: { orderIdx: requestGetOrderDto.orderIdx },
      relations: { user: true, product: true },
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

    return order;
  }
}
