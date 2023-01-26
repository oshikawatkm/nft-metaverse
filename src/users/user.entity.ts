import { CreateDateColumn, UpdateDateColumn, Entity, Column, PrimaryGeneratedColumn, Generated, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsInt,  MaxLength } from "class-validator";

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
  password: string;

//   @OneToMany(() => DidInfo, did=>did.user)
//   didInfos?:DidInfo[]
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  readonly createdAt: Date;
  
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  readonly updatedAt: Date;
}