import { CreateDateColumn, UpdateDateColumn, Entity, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "../orders/order.entity";
import { ModelConverter } from "../model_converters/model_converter.entity";

@Entity("order-model_converters")
export class OrderModelConverter {
  @PrimaryColumn()
  order_id: number;

  @PrimaryColumn()
  model_converter_id: number;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "order_id" })
  public order!: Order;

  @ManyToOne(() => ModelConverter, (modelConverter) => modelConverter.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "model_converter_id" })
  public modelConverter!: ModelConverter;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}