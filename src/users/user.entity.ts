import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsInt,  MaxLength } from "class-validator";
import { NftModel } from 'src/nft_models/nft_model.entity';

@Entity("users")
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @MaxLength(20)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  did: string;

  @Column()
  password: string;  // PoCなので生で保存

  @Column()
  publicKey: string;

  @Column()
  privateKey: string;  // PoCなので生で保存

  @Column()
  address: string;

  @OneToMany(() => NftModel, (nftModel)=> nftModel.user, {
    cascade: true,
  })
  nftModels: NftModel[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}