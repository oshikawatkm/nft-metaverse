import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { EthersService } from '../ethers/ethers.service'

@ApiTags('users')
@Controller('users')
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
    let [pubKey, privateKey, address] = await this.ethersService.generateKeyPair();
    this.usersService.create(createUserDto, pubKey, privateKey, address);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    this.usersService.login(loginUserDto);
  }

}
