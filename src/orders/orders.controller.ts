import { Body, Version, Param, Controller, Get, Post, Put, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Put(':id/commissione')
  commissione(@Param('id', ParseIntPipe) id: number, @Body() createOrderDto: CreateOrderDto) {
    this.ordersService.commission(id, 1);
  }

  @Put(':id/complete')
  complete(@Param('id', ParseIntPipe) id: number, @Body() createOrderDto: CreateOrderDto) {
    this.ordersService.complete(id, 1);
  }

}
