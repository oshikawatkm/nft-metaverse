import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ModelConvertersService } from './model_converters.service';
import { ApiTags } from '@nestjs/swagger';
import { ModelConverter } from './model_converter.entity';
import { LoginModelConverterDto } from './dto/login-converter.dto';

@ApiTags('model_converters')
@Controller('model_converters')
export class ModelConvertersController {

  constructor(
    private readonly modelConvertersService: ModelConvertersService,
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<ModelConverter[]> {
    return this.modelConvertersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: ModelConverter) {
    this.modelConvertersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModelConverter> {
    return this.modelConvertersService.findOne(id);
  }

  @Post()
  login(@Body() loginModelConverterDto: LoginModelConverterDto) {
    this.modelConvertersService.login(loginModelConverterDto);
  }
  
}
