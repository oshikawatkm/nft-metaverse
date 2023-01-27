import { IsNotEmpty } from 'class-validator';

export class CreateNftModelDto {

  // @IsNotEmpty()
  // readonly filename: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly copyright: string;

  @IsNotEmpty()
  readonly format: string;

  @IsNotEmpty()
  readonly description: string;

}