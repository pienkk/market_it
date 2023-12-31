import { IsNotEmpty, IsString } from "class-validator";

/**
 * 주문 상태 변경시 사용하는 DTO
 */
export class RequestOrderStatusChangeDto {
  @IsString()
  @IsNotEmpty()
  readonly orderIdx: string;
}

/**
 * 단일 주문 조회시 사용하는 DTO
 */
export class RequestGetOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly orderIdx: string;
}
