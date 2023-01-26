import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { EthersService } from '../ethers/ethers.service'

@ApiTags('model_converters')
@Controller('model_converters')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly ethersService: EthersService
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let [pubKey, privateKey] = await this.ethersService.generateKeyPair();
    this.usersService.create(createUserDto, pubKey, privateKey);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  login(@Body() loginUserDto: LoginUserDto) {
    this.usersService.login(loginUserDto);
  }

}
