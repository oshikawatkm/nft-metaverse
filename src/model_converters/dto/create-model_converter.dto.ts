import { IsNotEmpty } from 'class-validator';

export class CreateModelConverterDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string; // PoCなので生で保存
}