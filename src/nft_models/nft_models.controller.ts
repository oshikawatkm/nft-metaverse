import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NftModelsService } from './nft_models.service';
import { EthersService } from '../ethers/ethers.service'
import { CreateNftModelDto } from './dto/create-nft_model.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NftModel } from './nft_model.entity';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { UsersService } from '../users/users.service';

@ApiTags('nft-model')
@Controller('nft-model')
export class NftModelsController {

  constructor(
    private readonly nftModelsService: NftModelsService,
    private readonly usersService: UsersService,
    private readonly ethersService: EthersService,
  ) {}

  @Get()
  @Version('1')
  findAll(): Promise<NftModel[]> {
    return this.nftModelsService.findAll();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        copyright: { type: 'string' },
        modelFormat: { type: 'string' },
        description: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() createNftModelDto: CreateNftModelDto) {
    try {
      let modelPath; // file
      let [tokenId, metadataFile] = await this.ethersService.mint(
          createNftModelDto.name, 
          createNftModelDto.creator,
          createNftModelDto.description,
          createNftModelDto.format,
          createNftModelDto.copyright,
          modelPath
        );
      let user = await this.usersService.findOne(1)
      await this.nftModelsService.create(createNftModelDto, tokenId, metadataFile, user);
      return true;
    } catch(err: unknown) {
      console.error(err);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NftModel> {
    return this.nftModelsService.findOne(id);
  }
}
