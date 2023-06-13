import { TimeAbs } from "src/common/entities/time.entity";
import { OrderEntity } from "src/orders/entities/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity extends TimeAbs {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_idx",
    comment: "유저 인덱스",
  })
  userIdx: string;

  @Column({
    type: "varchar",
    length: 10,
    comment: "유저 이름",
  })
  name: string;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
