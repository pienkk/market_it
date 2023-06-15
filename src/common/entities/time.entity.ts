import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class TimeAbs {
  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at", select: false })
  deletedAt: Date | undefined;
}
