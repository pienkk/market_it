import { OrderStatusType } from "../types/orders.type";

/**
 * 단일 주문 조회 응답 DTO
 */
export class ResponseOrderDetailDto {
  orderIdx: string;
  quantity: number;
  price: number;
  status: OrderStatusType;
  createdAt: Date;
  user: {
    name: string;
  };
  product: {
    productIdx: string;
    name: string;
    description: string;
    price: number;
  };
}

/**
 * 주문 목록 조회 응답 DTO
 */
export class ResponseOrdersPageNationDto {
  orders: ResponseOrderDetailDto[];
  total: number;
}
