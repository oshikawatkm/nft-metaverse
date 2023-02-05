import { Body, Version, Param, Controller, Get, Post, Delete, UseGuards, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NftModelsService } from './nft_models.service';
import { EthersService } from '../ethers/ethers.service'
import { CreateNftModelDto } from './dto/create-nft_model.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { NftModel } from './nft_model.entity';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('nft-models')
@Controller('nft-models')
export class NftModelsController {

  constructor(
    private readonly nftModelsService: NftModelsService,
    private readonly usersService: UsersService,
    private readonly ethersService: EthersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @Version('1')
  findAll(): Promise<NftModel[]> {
    return this.nftModelsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        copyright: { type: 'string' },
        format: { type: 'string' },
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
      let modelFileName = file.filename;
      let user = await this.usersService.findOne(1);
      let [tokenId, metadataFile] = await this.ethersService.mint(
          user.privateKey,
          user.address,
          createNftModelDto.name, 
          createNftModelDto.description,
          createNftModelDto.format,
          createNftModelDto.copyright,
          user.did,
          modelFileName
        );
      await this.nftModelsService.create(createNftModelDto, tokenId, metadataFile, user);
      return true;
    } catch(err: unknown) {
      console.error(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    let nftModel = await this.nftModelsService.findOne(id);
    let events = await this.ethersService.filterEvent(nftModel.tokenId);

    return {
      ...nftModel,
      events
    }
  }
}
