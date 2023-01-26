import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ModelConvertersService } from './model_converters.service';
import { ApiTags } from '@nestjs/swagger';
import { ModelConverter } from './model_converter.entity';
import { LoginModelConverterDto } from './dto/login-converter.dto';
import { EthersService } from '../ethers/ethers.service'

@ApiTags('model_converters')
@Controller('model_converters')
export class ModelConvertersController {

  constructor(
    private readonly modelConvertersService: ModelConvertersService,
    private readonly ethersService: EthersService
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<ModelConverter[]> {
    return this.modelConvertersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: ModelConverter) {
    let [pubKey, privateKey] = await this.ethersService.generateKeyPair();
    this.modelConvertersService.create(createUserDto, pubKey, privateKey);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModelConverter> {
    return this.modelConvertersService.findOne(id);
  }

  @Post('login')
  login(@Body() loginModelConverterDto: LoginModelConverterDto): Promise<Boolean> {
    return this.modelConvertersService.login(loginModelConverterDto);
  }
  
}
