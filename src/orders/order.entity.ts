import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany } from 'typeorm';
import { IsInt } from "class-validator";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  reward_wei: number;

  @Column()
  @IsInt()
  status: number; // 1. Uncommissioned 2. Commissioned 3.completed
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}