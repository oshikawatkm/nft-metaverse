import { Controller, Get, Req, UseGuards, Version } from "@nestjs/common";
import { User  as UserEntity } from "../users/user.entity";
import { ModelConvertersService } from "../model_converters/model_converters.service";
import { UsersService } from "../users/users.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { User } from './user.decorator';
import { ModelConverter } from './model_converter.decorator';
import { ModelConverter  as ModelConverterEntity } from "../model_converters/model_converter.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly usersService: UsersService,
    private readonly modelConvertersService: ModelConvertersService
  ){}


  @UseGuards(JwtAuthGuard)
  @Get('user')
  async authUser(@User() user: UserEntity): Promise<any> {
    console.log(user)
    return await this.usersService.findOne(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('model_converter')
  async authModelController(@ModelConverter() modelConverter: ModelConverterEntity): Promise<any> {
    return await this.modelConvertersService.findOne(modelConverter.id);
  } 
}