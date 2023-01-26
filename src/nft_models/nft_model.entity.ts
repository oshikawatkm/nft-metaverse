import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany } from 'typeorm';
import { IsInt } from "class-validator";

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
  description: string;

  @Column()
  @IsInt()
  modelFormat: string;
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}