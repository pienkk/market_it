import { TimeAbs } from "src/common/entities/time.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderStatusEnum, OrderStatusType } from "../types/orders.type";
import { UserEntity } from "src/users/entities/users.entity";
import { ProductEntity } from "./products.entity";

@Entity("orders")
export class OrderEntity extends TimeAbs {
  @PrimaryGeneratedColumn("uuid", {
    name: "order_idx",
    comment: "주문 인덱스",
  })
  orderIdx: string;

  @Column({
    type: "int",
    comment: "주문 수량",
  })
  quantity: number;

  @Column({
    type: "int",
    comment: "주문 가격",
  })
  price: number;

  @Column({
    type: "enum",
    enum: OrderStatusEnum,
    comment:
      "주문 상태 / ORDER_PENDING: 주문 대기, ORDER_ACCEPTED: 주문 접수, ORDER_COMPLETED: 주문 완료, ORDER_CANCELED: 주문 취소",
  })
  status: OrderStatusType;

  @Column({
    type: "uuid",
    name: "user_idx",
    comment: "유저 참조 인덱스",
  })
  userIdx: string;

  @Column({
    type: "uuid",
    name: "product_idx",
    comment: "상품 참조 인덱스",
  })
  productIdx: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "user_idx" })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  @JoinColumn({ name: "product_idx" })
  product: ProductEntity;
}
