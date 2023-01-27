import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  readonly tokenId: number;

  @IsNotEmpty()
  readonly reward_wei: number;

  @IsNotEmpty()
  readonly format: string;
}