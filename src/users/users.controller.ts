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
    let [privateKey, pubKey, address] = await this.ethersService.generateKeyPair();
    this.usersService.create(createUserDto, pubKey, privateKey, address);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    let user = await this.usersService.findOne(id);
    let userPrivkey = user.privateKey;
    let balance = await this.ethersService.getBalance(userPrivkey);

    return {
      ...user,
      balance: parseInt(balance["_hex"], 16)
    }
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto) {
    this.usersService.login(loginUserDto);
  }

}
