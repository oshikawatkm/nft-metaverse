import { Body, Version, Param, Controller, Get, Post, Put, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelConvertersService } from '../model_converters/model_converters.service';
import { UsersService } from '../users/users.service';
import { EthersService } from '../ethers/ethers.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly modelConvertersService: ModelConvertersService,
    private readonly ethersService: EthersService,
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    let user = await this.usersService.findOne(1);
    this.ordersService.create(createOrderDto, user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.ordersService.findOne(id);
  }

  @Put(':id/commission')
  async commissione(@Param('id', ParseIntPipe) id: number) {
    let modelConverter = await this.modelConvertersService.findOne(1);
    this.ordersService.commission(id, modelConverter);
  }

  @Put(':id/complete')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async complete(@Param('id', ParseIntPipe) id: number, @Body() createOrderDto: CreateOrderDto) {
    let modelConverter = await this.modelConvertersService.findOne(1);
    this.ethersService.convert();
    this.ordersService.complete(id, modelConverter);
  }

}
