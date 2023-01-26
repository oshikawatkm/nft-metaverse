import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryColumn, JoinColumn, ManyToOne, Unique } from "typeorm";
import { User } from "../users/user.entity";
import { Order } from "../orders/order.entity";


@Entity("users_orders")
export class UserOrder {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  order_id: number;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  public order!: Order;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  public user!: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}