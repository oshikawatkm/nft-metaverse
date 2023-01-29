import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  readonly tokenId: number;

  @IsNotEmpty()
  readonly rewardWei: number;

  @IsNotEmpty()
  readonly format: string;
}