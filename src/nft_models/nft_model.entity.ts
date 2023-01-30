import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToMany(() => User, (user) => user,  {
    cascade: true,
  })
  @JoinTable()
  users: User[];
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}