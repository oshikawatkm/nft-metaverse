import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsInt } from "class-validator";
import { User } from 'src/users/user.entity';

@Entity("nft_models")
export class NftModel {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsInt()
  tokenId: number;

  @Column()
  @IsInt()
  filename: string;

  @Column()
  @IsInt()
  name: string;

  @Column()
  @IsInt()
  copyright: string;

  @Column()
  @IsInt()
  creator: string;

  @Column()
  @IsInt()
  description: string;

  @Column()
  @IsInt()
  format: string;

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