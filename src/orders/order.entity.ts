import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { IsInt } from "class-validator";
import { User } from 'src/users/user.entity';
import { ModelConverter } from 'src/model_converters/model_converter.entity';

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  rewardWei: number;

  @Column()
  @IsInt()
  tokenId: number;

  @Column()
  format: string;

  @Column()
  @IsInt()
  status: number; // 1. Uncommissioned, 2. Commissioned, 3. Completed

  @ManyToMany(() => User, (user) => user, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  @ManyToMany(() => ModelConverter, (modelConverter) => modelConverter, {
    cascade: true,
  })
  @JoinTable()
  modelConverters: ModelConverter[];
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}