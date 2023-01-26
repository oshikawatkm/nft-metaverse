import { IsNotEmpty } from 'class-validator';

export class CreateModelConverterDto {

  @IsNotEmpty()
  readonly tokenId: number;

  @IsNotEmpty()
  readonly reward_wei: number;
}