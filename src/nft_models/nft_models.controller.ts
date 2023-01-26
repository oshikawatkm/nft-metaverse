import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { NftModelsService } from './nft_models.service';
import { EthersService } from '../ethers/ethers.service'
import { CreateNftModelDto } from './dto/create-nft_model.dto';
import { ApiTags } from '@nestjs/swagger';
import { NftModel } from './nft_model.entity';

@ApiTags('nft-model')
@Controller('nft-model')
export class NftModelsController {

  constructor(
    private readonly nftModelsService: NftModelsService,
    private readonly ethersService: EthersService,
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<NftModel[]> {
    return this.nftModelsService.findAll();
  }

  @Post()
  async create(@Body() createNftModelDto: CreateNftModelDto) {
    this.nftModelsService.create(createNftModelDto);
    await this.ethersService.mint();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NftModel> {
    return this.nftModelsService.findOne(id);
  }
}
