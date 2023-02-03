import { Body, Version, Param, Controller, Get, Post, Put, ParseIntPipe, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelConvertersService } from '../model_converters/model_converters.service';
import { UsersService } from '../users/users.service';
import { EthersService } from '../ethers/ethers.service';
import { NftModelsService } from 'src/nft_models/nft_models.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly modelConvertersService: ModelConvertersService,
    private readonly nftModelsService: NftModelsService,
    private readonly ethersService: EthersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Version('1')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    let user = await this.usersService.findOne(1);
    return await this.ordersService.create(createOrderDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.ordersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/commission')
  async commission(@Param('id', ParseIntPipe) id: number) {
    let modelConverter = await this.modelConvertersService.findOne(1);
    await this.ordersService.commission(id, modelConverter);
  }

  @UseGuards(JwtAuthGuard)
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
  async complete(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number, @Body() createOrderDto: CreateOrderDto) {
    let modelConverter = await this.modelConvertersService.findOne(1);
    let nftModel = await this.nftModelsService.findOne(1);
    let user = await this.usersService.findOne(1);

    await this.ethersService.convert(
      user.privateKey,
      user.address,
      nftModel.tokenId,
      nftModel.filename,
      modelConverter.did,
      nftModel.format,
      file.filename
    );
    await this.ordersService.complete(id, modelConverter);
  }

}
