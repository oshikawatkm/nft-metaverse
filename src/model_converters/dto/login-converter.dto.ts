import { IsNotEmpty } from 'class-validator';

export class LoginModelConverterDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string; 
}