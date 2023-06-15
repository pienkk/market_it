import { TimeAbs } from "src/common/entities/time.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./orders.entity";

@Entity("products")
export class ProductEntity extends TimeAbs {
  @PrimaryGeneratedColumn("uuid", {
    name: "product_idx",
    comment: "상품 인덱스",
  })
  productIdx: string;

  @Column({
    type: "varchar",
    length: 100,
    comment: "상품 이름",
  })
  name: string;

  @Column({
    type: "varchar",
    length: 200,
    comment: "상품 설명",
  })
  description: string;

  @Column({
    type: "int",
    comment: "상품 가격",
  })
  price: number;

  @OneToMany(() => OrderEntity, (order) => order.product)
  orders: OrderEntity[];
}
